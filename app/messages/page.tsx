"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageList } from "@/components/messages/message-list";
import { ChatWindow } from "@/components/messages/chat-window";
import { CallOverlay } from "@/components/messages/call-overlay";
import { useMessages } from "@/lib/messages";
import { toast } from "sonner";

export default function MessagesPage() {
  const { chats, selectedChat, setSelectedChat, markAsRead } = useMessages();
  const [isInCall, setIsInCall] = useState<'audio' | 'video' | null>(null);

  const handleCall = (type: 'audio' | 'video') => {
    if (!selectedChat) return;
    
    const chat = chats.find(c => c.id === selectedChat);
    if (!chat?.online) {
      toast.error(`${chat?.name} is currently offline`);
      return;
    }

    setIsInCall(type);
    toast.success(`Starting ${type} call with ${chat.name}`);
  };

  const endCall = () => {
    setIsInCall(null);
    toast.info("Call ended");
  };

  const currentChat = chats.find(c => c.id === selectedChat);

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-6 max-w-6xl">
        <Card className="grid grid-cols-12 h-[calc(100vh-8rem)] relative">
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

          {currentChat ? (
            <ChatWindow 
              chat={currentChat}
              onCall={handleCall}
            />
          ) : (
            <div className="col-span-8 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <h3 className="text-lg font-medium">Welcome to Messages</h3>
                <p>Select a conversation to start chatting</p>
              </div>
            </div>
          )}

          {isInCall && currentChat && (
            <CallOverlay
              type={isInCall}
              chat={currentChat}
              onEnd={endCall}
            />
          )}
        </Card>
      </div>
    </div>
  );
}