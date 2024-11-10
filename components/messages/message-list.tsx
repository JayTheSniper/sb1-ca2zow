"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { ChatService, type Chat } from "@/lib/chat-service";
import { useAuth } from "@/lib/auth";

interface MessageListProps {
  selectedChat: number | null;
  onSelectChat: (id: number) => void;
}

export function MessageList({ selectedChat, onSelectChat }: MessageListProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const unsubscribe = ChatService.subscribeToUserChats(user.uid, (updatedChats) => {
      setChats(updatedChats);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="space-y-1">
      <AnimatePresence>
        {chats.map((chat) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant={selectedChat === Number(chat.id) ? "secondary" : "ghost"}
              className="w-full justify-start px-4 py-6 relative"
              onClick={() => onSelectChat(Number(chat.id))}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="relative">
                  <Avatar>
                    <img 
                      src={chat.participants[0] === user?.uid 
                        ? chat.participants[1] 
                        : chat.participants[0]} 
                      alt="User avatar" 
                      className="object-cover"
                    />
                  </Avatar>
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{chat.participants[0] === user?.uid 
                      ? chat.participants[1] 
                      : chat.participants[0]}</h4>
                    <span className="text-xs text-muted-foreground">
                      {chat.lastMessageTime?.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {chat.lastMessage}
                  </p>
                  {chat.unreadCount[user?.uid || ''] > 0 && (
                    <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {chat.unreadCount[user?.uid || '']}
                    </span>
                  )}
                </div>
              </div>
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}