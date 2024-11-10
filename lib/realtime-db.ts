import { getDatabase, ref, onValue, push, set, update, serverTimestamp } from 'firebase/database';
import { app } from './firebase';

const db = getDatabase(app);

export class RealtimeDB {
  static subscribeToMessages(chatId: string, callback: (messages: any[]) => void) {
    const messagesRef = ref(db, `messages/${chatId}`);
    return onValue(messagesRef, (snapshot) => {
      const messages: any[] = [];
      snapshot.forEach((child) => {
        messages.push({
          id: child.key,
          ...child.val(),
          timestamp: new Date(child.val().timestamp)
        });
      });
      callback(messages.sort((a, b) => a.timestamp - b.timestamp));
    });
  }

  static async sendMessage(chatId: string, message: any) {
    const messagesRef = ref(db, `messages/${chatId}`);
    const newMessageRef = push(messagesRef);
    await set(newMessageRef, {
      ...message,
      timestamp: serverTimestamp()
    });

    // Update chat metadata
    const chatRef = ref(db, `chats/${chatId}`);
    await update(chatRef, {
      lastMessage: message.content,
      lastMessageTime: serverTimestamp(),
      [`unreadCount.${message.receiverId}`]: (prev: number) => (prev || 0) + 1
    });
  }

  static subscribeToChats(userId: string, callback: (chats: any[]) => void) {
    const chatsRef = ref(db, 'chats');
    return onValue(chatsRef, (snapshot) => {
      const chats: any[] = [];
      snapshot.forEach((child) => {
        const chat = child.val();
        if (chat.participants.includes(userId)) {
          chats.push({
            id: child.key,
            ...chat,
            lastMessageTime: chat.lastMessageTime ? new Date(chat.lastMessageTime) : null
          });
        }
      });
      callback(chats.sort((a, b) => (b.lastMessageTime || 0) - (a.lastMessageTime || 0)));
    });
  }

  static subscribeToNotifications(userId: string, callback: (count: number) => void) {
    const notificationsRef = ref(db, `notifications/${userId}`);
    return onValue(notificationsRef, (snapshot) => {
      let count = 0;
      snapshot.forEach((child) => {
        if (!child.val().read) count++;
      });
      callback(count);
    });
  }

  static subscribeToUnreadMessages(userId: string, callback: (count: number) => void) {
    const chatsRef = ref(db, 'chats');
    return onValue(chatsRef, (snapshot) => {
      let count = 0;
      snapshot.forEach((child) => {
        const chat = child.val();
        if (chat.participants.includes(userId)) {
          count += chat.unreadCount?.[userId] || 0;
        }
      });
      callback(count);
    });
  }

  static async markMessagesAsRead(chatId: string, userId: string) {
    const updates: any = {};
    updates[`chats/${chatId}/unreadCount/${userId}`] = 0;
    
    const messagesRef = ref(db, `messages/${chatId}`);
    onValue(messagesRef, (snapshot) => {
      snapshot.forEach((child) => {
        const message = child.val();
        if (!message.read && message.receiverId === userId) {
          updates[`messages/${chatId}/${child.key}/read`] = true;
        }
      });
    }, { onlyOnce: true });

    await update(ref(db), updates);
  }

  static async createChat(participants: string[]) {
    const chatsRef = ref(db, 'chats');
    const newChatRef = push(chatsRef);
    await set(newChatRef, {
      participants,
      createdAt: serverTimestamp(),
      unreadCount: participants.reduce((acc, id) => ({ ...acc, [id]: 0 }), {})
    });
    return newChatRef.key;
  }
}