"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { motion, AnimatePresence } from "framer-motion";
import { Smile } from "lucide-react";

const REACTIONS = [
  { emoji: "👍", label: "Like" },
  { emoji: "❤️", label: "Love" },
  { emoji: "😂", label: "Haha" },
  { emoji: "😮", label: "Wow" },
  { emoji: "😢", label: "Sad" },
  { emoji: "😡", label: "Angry" }
];

interface PostReactionsProps {
  postId: number;
  initialReactions: Record<string, { emoji: string; count: number; users: string[]; }>;
  onReact: (postId: number, emoji: string) => void;
}

export function PostReactions({ postId, initialReactions, onReact }: PostReactionsProps) {
  const [reactions, setReactions] = useState(initialReactions);
  const [showReactions, setShowReactions] = useState(false);

  const handleReaction = (emoji: string) => {
    onReact(postId, emoji);
    setShowReactions(false);
  };

  return (
    <div className="flex items-center gap-2">
      <AnimatePresence>
        {Object.entries(reactions).map(([emoji, data]) => (
          <motion.div
            key={emoji}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex items-center"
          >
            <Button variant="ghost" size="sm" onClick={() => handleReaction(emoji)}>
              <span className="mr-1">{data.emoji}</span>
              <span>{data.count}</span>
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>

      <Popover open={showReactions} onOpenChange={setShowReactions}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm">
            <Smile className="h-4 w-4 mr-2" />
            React
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-2" align="start">
          <div className="grid grid-cols-6 gap-2">
            {REACTIONS.map((reaction) => (
              <Button
                key={reaction.emoji}
                variant="ghost"
                size="sm"
                className="p-2"
                onClick={() => handleReaction(reaction.emoji)}
              >
                <span className="text-xl">{reaction.emoji}</span>
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}