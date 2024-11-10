"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Phone, Video, Info, ThumbsUp, Heart, Smile } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface Message {
  id: number;
  content: string;
  sent: boolean;
  time: string;
  reactions?: string[];
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
  email: string;
}

interface ChatWindowProps {
  chat: Chat;
  onCall: (type: 'audio' | 'video') => void;
}

export function ChatWindow({ chat, onCall }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi there! How can I help you today?",
      sent: false,
      time: "10:00 AM",
      reactions: ["👍"]
    },
    {
      id: 2,
      content: "I'm interested in your courses",
      sent: true,
      time: "10:02 AM",
      reactions: ["❤️"]
    },
    {
      id: 3,
      content: "Great! I'd be happy to help you find the perfect course. What subjects are you interested in?",
      sent: false,
      time: "10:03 AM"
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: messages.length + 1,
      content: newMessage,
      sent: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply: Message = {
        id: messages.length + 2,
        content: "Thanks for your message! I'll get back to you shortly.",
        sent: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  const addReaction = (messageId: number, reaction: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions || [];
        if (!reactions.includes(reaction)) {
          return { ...msg, reactions: [...reactions, reaction] };
        }
      }
      return msg;
    }));
  };

  return (
    <div className="col-span-8 flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar>
              <img src={chat.avatar} alt={chat.name} className="object-cover" />
            </Avatar>
            {chat.online && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            )}
          </div>
          <div>
            <h3 className="font-medium">{chat.name}</h3>
            <p className="text-sm text-muted-foreground">
              {chat.online ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onCall('audio')}
          >
            <Phone className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onCall('video')}
          >
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] group ${
                  message.sent
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                } rounded-lg p-3 relative`}
              >
                <p>{message.content}</p>
                <p className={`text-xs ${
                  message.sent ? 'text-primary-foreground/80' : 'text-muted-foreground'
                } mt-1`}>
                  {message.time}
                </p>

                {/* Reactions */}
                {message.reactions && message.reactions.length > 0 && (
                  <div className="absolute -bottom-6 flex gap-1">
                    {message.reactions.map((reaction, index) => (
                      <span key={index} className="text-sm">{reaction}</span>
                    ))}
                  </div>
                )}

                {/* Reaction Buttons */}
                <div className={`absolute ${message.sent ? 'left-0' : 'right-0'} -top-8 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-background shadow rounded-full p-1`}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => addReaction(message.id, "👍")}
                  >
                    <ThumbsUp className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => addReaction(message.id, "❤️")}
                  >
                    <Heart className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => addReaction(message.id, "😊")}
                  >
                    <Smile className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="flex gap-1">
                <motion.div
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
                <motion.div
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                />
                <motion.div
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                />
              </div>
              <span className="text-sm">Typing...</span>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
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
          <Button type="submit">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}