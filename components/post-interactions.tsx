"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, Smile } from "lucide-react";
import { toast } from "sonner";

const REACTIONS = [
  { emoji: "👍", label: "Like", color: "text-blue-500" },
  { emoji: "❤️", label: "Love", color: "text-red-500" },
  { emoji: "😂", label: "Haha", color: "text-yellow-500" },
  { emoji: "😮", label: "Wow", color: "text-yellow-500" },
  { emoji: "😢", label: "Sad", color: "text-yellow-500" },
  { emoji: "😡", label: "Angry", color: "text-orange-500" }
];

interface PostInteractionsProps {
  postId: number;
  onReaction: (emoji: string) => void;
  onComment: () => void;
  onShare: () => void;
  initialReactions?: Record<string, number>;
  initialComments?: number;
  initialShares?: number;
}

export function PostInteractions({
  postId,
  onReaction,
  onComment,
  onShare,
  initialReactions = {},
  initialComments = 0,
  initialShares = 0
}: PostInteractionsProps) {
  const [reactions, setReactions] = useState(initialReactions);
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleReaction = async (emoji: string) => {
    try {
      setIsAnimating(true);
      
      // Optimistically update UI
      setSelectedReaction(emoji);
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
      toast.success(`Reacted with ${emoji}`);
    } catch (error) {
      // Revert on error
      setSelectedReaction(null);
      setReactions(prev => ({
        ...prev,
        [emoji]: Math.max(0, (prev[emoji] || 0) - 1)
      }));
      toast.error("Failed to add reaction");
    } finally {
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleShare = async (platform?: string) => {
    try {
      const shareUrl = `https://schoolsat.com/posts/${postId}`;
      const shareText = "Check out this post on Schoolsat!";

      if (platform) {
        let shareLink = '';
        switch (platform) {
          case 'facebook':
            shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
            break;
          case 'twitter':
            shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
            break;
          case 'whatsapp':
            shareLink = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
            break;
          case 'telegram':
            shareLink = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
            break;
        }
        window.open(shareLink, '_blank');
      } else if (navigator.share) {
        await navigator.share({
          title: "Share Post",
          text: shareText,
          url: shareUrl
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        toast.error("Failed to share post");
      }
    }
    setShowShareMenu(false);
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
              className={`relative group ${selectedReaction ? REACTIONS.find(r => r.emoji === selectedReaction)?.color : ""}`}
            >
              {selectedReaction ? (
                <span className="text-lg mr-2">{selectedReaction}</span>
              ) : (
                <Heart className={`h-4 w-4 mr-2 ${selectedReaction ? 'fill-current' : ''}`} />
              )}
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
            <motion.div 
              className="flex gap-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
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
            </motion.div>
          </PopoverContent>
        </Popover>

        <Button variant="ghost" size="sm" onClick={onComment}>
          <MessageCircle className="h-4 w-4 mr-2" />
          {initialComments}
        </Button>

        <Popover open={showShareMenu} onOpenChange={setShowShareMenu}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              {initialShares}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="start">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('facebook')}
                className="w-full"
              >
                Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('twitter')}
                className="w-full"
              >
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('whatsapp')}
                className="w-full"
              >
                WhatsApp
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('telegram')}
                className="w-full"
              >
                Telegram
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare()}
                className="w-full col-span-2"
              >
                Copy Link
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}