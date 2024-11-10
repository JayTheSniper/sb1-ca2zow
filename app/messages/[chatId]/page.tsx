"use client";

import { useEffect } from "react";
import { useMessages } from "@/lib/messages";
import { ChatWindow } from "@/components/messages/chat-window";
import { MessageList } from "@/components/messages/message-list";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface MessagesPageProps {
  params: {
    chatId: string;
  };
}

export default function MessagesPage({ params }: MessagesPageProps) {
  const { chats, selectedChat, setSelectedChat, markAsRead } = useMessages();
  const chatId = parseInt(params.chatId);

  useEffect(() => {
    if (chatId) {
      if (!chats.some(chat => chat.id === chatId)) {
        toast.error("Chat not found");
        return;
      }

      setSelectedChat(chatId);
      markAsRead(chatId);
    }
  }, [chatId, chats, setSelectedChat, markAsRead]);

  const currentChat = chats.find(c => c.id === selectedChat);

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="grid grid-cols-12 h-[calc(100vh-8rem)] relative overflow-hidden">
            <div className="col-span-4 border-r">
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <MessageList 
                  chats={chats}
                  selectedChat={selectedChat}
                  onSelectChat={(id) => {
                    setSelectedChat(id);
                    markAsRead(id);
                  }}
                />
              </ScrollArea>
            </div>

            <AnimatePresence mode="wait">
              {currentChat ? (
                <motion.div
                  key={currentChat.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="col-span-8"
                >
                  <ChatWindow chat={currentChat} />
                </motion.div>
              ) : (
                <motion.div 
                  className="col-span-8 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="text-center text-muted-foreground">
                    <h3 className="text-lg font-medium">Welcome to Messages</h3>
                    <p>Select a conversation to start chatting</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}