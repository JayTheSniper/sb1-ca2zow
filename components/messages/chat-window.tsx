"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Send, Phone, Video, Info } from "lucide-react";
import { MessageBubble } from "./message-bubble";
import { ChatService, type Message } from "@/lib/chat-service";
import { toast } from "sonner";

interface ChatWindowProps {
  chatId: string;
  currentUserId: string;
  recipient: {
    id: string;
    name: string;
    avatar: string;
    online: boolean;
  };
  onCall: (type: 'audio' | 'video') => void;
}

export function ChatWindow({ chatId, currentUserId, recipient, onCall }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatService = ChatService.getInstance();

  useEffect(() => {
    const unsubscribe = chatService.subscribeToMessages(chatId, (updatedMessages) => {
      setMessages(updatedMessages);

      // Mark messages as read
      const unreadMessages = updatedMessages
        .filter(msg => !msg.read && msg.senderId === recipient.id)
        .map(msg => msg.id);

      if (unreadMessages.length > 0) {
        chatService.markAsRead(chatId, unreadMessages, currentUserId)
          .catch(error => console.error('Error marking messages as read:', error));
      }
    });

    return () => unsubscribe();
  }, [chatId, currentUserId, recipient.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    try {
      await chatService.sendMessage(chatId, newMessage, currentUserId, recipient.id);
      setNewMessage("");
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="col-span-8 flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar>
              <img src={recipient.avatar} alt={recipient.name} className="object-cover" />
            </Avatar>
            {recipient.online && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            )}
          </div>
          <div>
            <h3 className="font-medium">{recipient.name}</h3>
            <p className="text-sm text-muted-foreground">
              {recipient.online ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onCall('audio')}
            disabled={!recipient.online}
          >
            <Phone className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onCall('video')}
            disabled={!recipient.online}
          >
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isCurrentUser={message.senderId === currentUserId}
            />
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button type="submit" disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}