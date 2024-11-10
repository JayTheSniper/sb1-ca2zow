import { 
  collection, 
  query, 
  where, 
  orderBy, 
  addDoc, 
  serverTimestamp,
  onSnapshot,
  DocumentData,
  updateDoc,
  doc,
  writeBatch,
  increment
} from 'firebase/firestore';
import { db } from './firebase';

export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: Date;
  read: boolean;
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: Record<string, number>;
}

class ChatServiceClass {
  async sendMessage(chatId: string, content: string, senderId: string, receiverId: string): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      const messagesRef = collection(db, 'chats', chatId, 'messages');
      await addDoc(messagesRef, {
        content,
        senderId,
        receiverId,
        timestamp: serverTimestamp(),
        read: false
      });

      const chatRef = doc(db, 'chats', chatId);
      await updateDoc(chatRef, {
        lastMessage: content,
        lastMessageTime: serverTimestamp(),
        [`unreadCount.${receiverId}`]: increment(1)
      });
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  subscribeToMessages(chatId: string, callback: (messages: Message[]) => void): () => void {
    if (typeof window === 'undefined') return () => {};

    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate()
      })) as Message[];
      callback(messages);
    });
  }

  async markAsRead(chatId: string, messageIds: string[], userId: string): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      const batch = writeBatch(db);
      messageIds.forEach(messageId => {
        const messageRef = doc(db, 'chats', chatId, 'messages', messageId);
        batch.update(messageRef, { read: true });
      });

      const chatRef = doc(db, 'chats', chatId);
      batch.update(chatRef, {
        [`unreadCount.${userId}`]: 0
      });

      await batch.commit();
    } catch (error) {
      console.error('Error marking messages as read:', error);
      throw error;
    }
  }

  async createChat(participants: string[]): Promise<string> {
    if (typeof window === 'undefined') return '';

    try {
      const chatsRef = collection(db, 'chats');
      const chatDoc = await addDoc(chatsRef, {
        participants,
        createdAt: serverTimestamp(),
        unreadCount: participants.reduce((acc, id) => ({ ...acc, [id]: 0 }), {})
      });
      return chatDoc.id;
    } catch (error) {
      console.error('Error creating chat:', error);
      throw error;
    }
  }

  subscribeToChat(chatId: string, callback: (chat: Chat) => void): () => void {
    if (typeof window === 'undefined') return () => {};

    const chatRef = doc(db, 'chats', chatId);
    return onSnapshot(chatRef, (doc) => {
      if (doc.exists()) {
        const chat = {
          id: doc.id,
          ...doc.data(),
          lastMessageTime: doc.data().lastMessageTime?.toDate()
        } as Chat;
        callback(chat);
      }
    });
  }

  subscribeToUserChats(userId: string, callback: (chats: Chat[]) => void): () => void {
    if (typeof window === 'undefined') return () => {};

    const chatsRef = collection(db, 'chats');
    const q = query(
      chatsRef,
      where('participants', 'array-contains', userId),
      orderBy('lastMessageTime', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
      const chats = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        lastMessageTime: doc.data().lastMessageTime?.toDate()
      })) as Chat[];
      callback(chats);
    });
  }
}

export const ChatService = new ChatServiceClass();