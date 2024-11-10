import { create } from 'zustand';

export interface Message {
  id: number;
  content: string;
  sent: boolean;
  time: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  typing: boolean;
  email: string;
  messages: Message[];
}

interface MessagesState {
  chats: Chat[];
  selectedChat: number | null;
  setSelectedChat: (id: number | null) => void;
  addMessage: (chatId: number, message: Omit<Message, 'id' | 'time'>) => void;
  markAsRead: (chatId: number) => void;
  markAllAsRead: () => void;
  setTyping: (chatId: number, typing: boolean) => void;
  createChat: (recipientData: { id: number; name: string; avatar: string; }) => Promise<number>;
}

export const useMessages = create<MessagesState>((set, get) => ({
  chats: [],
  selectedChat: null,
  setSelectedChat: (id) => set({ selectedChat: id }),
  addMessage: (chatId, message) => set((state) => ({
    chats: state.chats.map((chat) => {
      if (chat.id === chatId) {
        const newMessage = {
          ...message,
          id: Date.now(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: message.content,
          time: 'Just now',
          unread: !message.sent ? chat.unread + 1 : chat.unread
        };
      }
      return chat;
    })
  })),
  markAsRead: (chatId) => set((state) => ({
    chats: state.chats.map((chat) =>
      chat.id === chatId ? { ...chat, unread: 0 } : chat
    )
  })),
  markAllAsRead: () => set((state) => ({
    chats: state.chats.map((chat) => ({ ...chat, unread: 0 }))
  })),
  setTyping: (chatId, typing) => set((state) => ({
    chats: state.chats.map((chat) =>
      chat.id === chatId ? { ...chat, typing } : chat
    )
  })),
  createChat: async (recipientData) => {
    try {
      const response = await fetch('/api/messages/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipientData)
      });

      if (!response.ok) {
        throw new Error('Failed to create chat');
      }

      const { chatId } = await response.json();

      if (!chatId) {
        throw new Error('No chat ID returned');
      }

      const newChat: Chat = {
        id: chatId,
        name: recipientData.name,
        avatar: recipientData.avatar,
        lastMessage: '',
        time: 'Just now',
        unread: 0,
        online: true,
        typing: false,
        email: '',
        messages: []
      };

      set((state) => ({
        chats: [newChat, ...state.chats]
      }));

      return chatId;
    } catch (error) {
      console.error('Chat creation error:', error);
      throw error;
    }
  }
}));

export const simulateResponse = async (chatId: number) => {
  const responses = [
    "Thanks for your message! I'll get back to you shortly.",
    "Got it! Let me check and get back to you.",
    "Thanks for reaching out! I'll look into this.",
    "Message received! I'll respond soon."
  ];

  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  const messages = useMessages.getState();

  messages.setTyping(chatId, true);
  await new Promise(resolve => setTimeout(resolve, 1000));
  messages.setTyping(chatId, false);

  messages.addMessage(chatId, {
    content: randomResponse,
    sent: false,
    status: 'sent'
  });
};