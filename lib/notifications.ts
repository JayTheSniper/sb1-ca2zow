import { create } from 'zustand';

export interface Notification {
  id: number;
  type: 'message' | 'like' | 'comment' | 'share' | 'follow' | 'cart' | 'review';
  title: string;
  description: string;
  time: string;
  read: boolean;
  avatar?: string;
  link?: string;
  data?: any;
}

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'read'>) => void;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
}

export const useNotifications = create<NotificationsState>((set) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (notification) => set((state) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      read: false
    };
    return {
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1
    };
  }),
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ),
    unreadCount: Math.max(0, state.unreadCount - 1)
  })),
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true })),
    unreadCount: 0
  }))
}));

export const addSystemNotification = (notification: Omit<Notification, 'id' | 'read'>) => {
  const { addNotification } = useNotifications.getState();
  addNotification(notification);
};