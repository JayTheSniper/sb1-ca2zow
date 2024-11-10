import { useEffect } from 'react';
import { useNotifications } from '@/lib/notifications';

export function useNotificationSync() {
  const { addNotification } = useNotifications();

  useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001');

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'notification') {
          addNotification(data.payload);
        }
      } catch (error) {
        console.error('Error processing notification:', error);
      }
    };

    return () => {
      ws.close();
    };
  }, [addNotification]);
}