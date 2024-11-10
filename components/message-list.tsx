"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface MessageListProps {
  chats: Chat[];
  selectedChat: number | null;
  onSelectChat: (id: number) => void;
}

export function MessageList({ chats, selectedChat, onSelectChat }: MessageListProps) {
  return (
    <div className="space-y-1">
      {chats.map((chat) => (
        <Button
          key={chat.id}
          variant={selectedChat === chat.id ? "secondary" : "ghost"}
          className="w-full justify-start px-4 py-6 relative"
          onClick={() => onSelectChat(chat.id)}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="relative">
              <Avatar>
                <img src={chat.avatar} alt={chat.name} className="object-cover" />
              </Avatar>
              {chat.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
              )}
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{chat.name}</h4>
                <span className="text-xs text-muted-foreground">{chat.time}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
            </div>
            {chat.unread > 0 && (
              <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {chat.unread}
              </span>
            )}
          </div>
        </Button>
      ))}
    </div>
  );
}