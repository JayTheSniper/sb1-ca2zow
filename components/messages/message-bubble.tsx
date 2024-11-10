"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Message } from "@/lib/chat-service";

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

export function MessageBubble({ message, isCurrentUser }: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex",
        isCurrentUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[70%] rounded-lg p-3 relative",
          isCurrentUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        <p>{message.content}</p>
        <div className="flex items-center gap-1 mt-1">
          <span className={cn(
            "text-xs",
            isCurrentUser ? "text-primary-foreground/80" : "text-muted-foreground"
          )}>
            {format(message.timestamp, "HH:mm")}
          </span>
          {isCurrentUser && (
            <span className="text-primary-foreground/80">
              {message.read ? (
                <CheckCheck className="h-3 w-3" />
              ) : (
                <Check className="h-3 w-3" />
              )}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}