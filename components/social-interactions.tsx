"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, Smile } from "lucide-react";
import { toast } from "sonner";

const REACTIONS = [
  { emoji: "👍", label: "Like" },
  { emoji: "❤️", label: "Love" },
  { emoji: "😂", label: "Haha" },
  { emoji: "😮", label: "Wow" },
  { emoji: "😢", label: "Sad" },
  { emoji: "😡", label: "Angry" }
];

interface SocialInteractionsProps {
  postId: number;
  initialReactions: Record<string, number>;
  initialComments: number;
  initialShares: number;
  onReaction: (emoji: string) => void;
  onComment: () => void;
  onShare: () => void;
}

export function SocialInteractions({
  postId,
  initialReactions,
  initialComments,
  initialShares,
  onReaction,
  onComment,
  onShare
}: SocialInteractionsProps) {
  const [reactions, setReactions] = useState(initialReactions);
  const [showReactions, setShowReactions] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleReaction = async (emoji: string) => {
    try {
      setIsAnimating(true);
      
      // Optimistically update UI
      setReactions(prev => ({
        ...prev,
        [emoji]: (prev[emoji] || 0) + 1
      }));

      // Send reaction to server
      const response = await fetch("/api/posts/react", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, emoji })
      });

      if (!response.ok) throw new Error();

      onReaction(emoji);
      setShowReactions(false);
    } catch (error) {
      // Revert on error
      setReactions(prev => ({
        ...prev,
        [emoji]: Math.max(0, (prev[emoji] || 0) - 1)
      }));
      toast.error("Failed to add reaction");
    } finally {
      setIsAnimating(false);
    }
  };

  const getTotalReactions = () => 
    Object.values(reactions).reduce((sum, count) => sum + count, 0);

  return (
    <div className="flex items-center justify-between border-t border-b py-2">
      <div className="flex items-center gap-2">
        <Popover open={showReactions} onOpenChange={setShowReactions}>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="relative"
            >
              <Smile className="h-4 w-4 mr-2" />
              <span>{getTotalReactions()}</span>
              <AnimatePresence>
                {isAnimating && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: -20 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    +1
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="start">
            <div className="flex gap-1">
              {REACTIONS.map(({ emoji, label }) => (
                <motion.button
                  key={emoji}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                  onClick={() => handleReaction(emoji)}
                  title={label}
                >
                  <span className="text-xl">{emoji}</span>
                </motion.button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <AnimatePresence>
          {Object.entries(reactions).map(([emoji, count]) => count > 0 && (
            <motion.div
              key={emoji}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center"
            >
              <span className="text-sm">{emoji}</span>
              <span className="text-sm text-muted-foreground ml-1">{count}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onComment}>
          <MessageCircle className="h-4 w-4 mr-2" />
          {initialComments}
        </Button>

        <Button variant="ghost" size="sm" onClick={onShare}>
          <Share2 className="h-4 w-4 mr-2" />
          {initialShares}
        </Button>
      </div>
    </div>
  );
}