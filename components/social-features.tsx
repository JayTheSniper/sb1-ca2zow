"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Share2, Send, Facebook, Twitter, WhatsApp, Copy, Mail } from "lucide-react";
import { toast } from "sonner";

const REACTIONS = ["👍", "❤️", "😊", "😂", "😮", "😢"];

interface SocialFeaturesProps {
  postId: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  initialLikes: number;
  initialComments: number;
}

export function SocialFeatures({ postId, author, content, initialLikes, initialComments }: SocialFeaturesProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");
  const [showReactions, setShowReactions] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

  const handleReaction = async (reaction: string) => {
    try {
      setSelectedReaction(reaction);
      setLikes(prev => prev + 1);
      setShowReactions(false);

      // Send reaction to server
      const response = await fetch("/api/posts/react", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, reaction })
      });

      if (!response.ok) throw new Error();

      toast.success("Reaction added!");
    } catch (error) {
      setLikes(prev => prev - 1);
      setSelectedReaction(null);
      toast.error("Failed to add reaction");
    }
  };

  const handleComment = async () => {
    if (!newComment.trim()) return;

    try {
      setComments(prev => [...prev, newComment]);
      setNewComment("");

      // Send comment to server
      const response = await fetch("/api/posts/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, content: newComment })
      });

      if (!response.ok) throw new Error();

      toast.success("Comment added!");
    } catch (error) {
      setComments(prev => prev.slice(0, -1));
      toast.error("Failed to add comment");
    }
  };

  const handleShare = async (platform?: string) => {
    const url = `https://schoolsat.com/posts/${postId}`;
    const text = encodeURIComponent(content);

    try {
      if (platform) {
        let shareUrl = '';
        switch (platform) {
          case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
          case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            break;
          case 'whatsapp':
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
            break;
          case 'email':
            shareUrl = `mailto:?subject=Check this out&body=${text}%0A%0A${url}`;
            break;
        }
        window.open(shareUrl, '_blank');
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      }
      setShowShareDialog(false);
    } catch (error) {
      toast.error("Failed to share");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between border-t border-b py-2">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowReactions(true)}
            className="relative"
          >
            {selectedReaction ? (
              <span className="mr-2 text-lg">{selectedReaction}</span>
            ) : (
              <Heart className="h-4 w-4 mr-2" />
            )}
            {likes}
          </Button>

          <AnimatePresence>
            {showReactions && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="absolute left-0 -top-12 bg-background border rounded-full p-2 shadow-lg flex gap-1"
              >
                {REACTIONS.map(reaction => (
                  <motion.button
                    key={reaction}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 hover:bg-muted rounded-full"
                    onClick={() => handleReaction(reaction)}
                  >
                    <span className="text-xl">{reaction}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-4 w-4 mr-2" />
            {initialComments + comments.length}
          </Button>

          <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share Post</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Facebook, label: 'Facebook', platform: 'facebook' },
                  { icon: Twitter, label: 'Twitter', platform: 'twitter' },
                  { icon: WhatsApp, label: 'WhatsApp', platform: 'whatsapp' },
                  { icon: Mail, label: 'Email', platform: 'email' },
                  { icon: Copy, label: 'Copy Link', platform: undefined }
                ].map(({ icon: Icon, label, platform }) => (
                  <Button
                    key={label}
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => handleShare(platform)}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex gap-2">
          <Input
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleComment()}
          />
          <Button onClick={handleComment}>
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <AnimatePresence>
          {comments.map((comment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-start gap-2 mt-4"
            >
              <Avatar className="h-8 w-8">
                <img src={author.avatar} alt={author.name} />
              </Avatar>
              <div className="flex-1 bg-muted p-2 rounded-lg">
                <p className="text-sm">{comment}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}