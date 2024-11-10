"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner';

type MessageHandler = (data: any) => void;
type MessageHandlers = Record<string, Set<MessageHandler>>;

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const handlersRef = useRef<MessageHandlers>({});
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const connect = useCallback(() => {
    try {
      const wsUrl = process.env.NODE_ENV === 'development'
        ? `ws://${window.location.hostname}:3001/ws`
        : 'wss://api.schoolsat.com/ws';

      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        setIsConnected(true);
        reconnectAttempts.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const { type, payload } = JSON.parse(event.data);
          const handlers = handlersRef.current[type];
          if (handlers) {
            handlers.forEach(handler => handler(payload));
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        if (reconnectAttempts.current < maxReconnectAttempts) {
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 10000);
          setTimeout(() => {
            reconnectAttempts.current++;
            connect();
          }, delay);
        }
      };

      wsRef.current = ws;
    } catch (error) {
      console.error('WebSocket connection error:', error);
      fallbackToPolling();
    }
  }, []);

  const fallbackToPolling = useCallback(() => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch('/api/messages/updates');
        const { type, payload } = await response.json();
        const handlers = handlersRef.current[type];
        if (handlers) {
          handlers.forEach(handler => handler(payload));
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 5000);

    return () => clearInterval(pollInterval);
  }, []);

  useEffect(() => {
    connect();
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [connect]);

  const subscribe = useCallback((type: string, handler: MessageHandler) => {
    if (!handlersRef.current[type]) {
      handlersRef.current[type] = new Set();
    }
    handlersRef.current[type].add(handler);

    return () => {
      const handlers = handlersRef.current[type];
      if (handlers) {
        handlers.delete(handler);
        if (handlers.size === 0) {
          delete handlersRef.current[type];
        }
      }
    };
  }, []);

  const sendMessage = useCallback(async (message: any) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      try {
        const response = await fetch('/api/messages/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(message)
        });
        if (!response.ok) throw new Error('Failed to send message');
        return await response.json();
      } catch (error) {
        console.error('Error sending message:', error);
        throw error;
      }
    }

    try {
      wsRef.current.send(JSON.stringify(message));
      return { success: true };
    } catch (error) {
      console.error('WebSocket send error:', error);
      throw error;
    }
  }, []);

  return {
    isConnected,
    sendMessage,
    subscribe
  };
}