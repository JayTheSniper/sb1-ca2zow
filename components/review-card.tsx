"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star, StarHalf, ThumbsUp, MessageCircle, Share2, Send, Smile } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface ReviewCardProps {
  review: {
    id: number;
    author: {
      name: string;
      avatar: string;
      grade: string;
    };
    subject: string;
    teacher: string;
    rating: number;
    content: string;
    likes: number;
    comments: number;
    time: string;
    helpful: number;
  };
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [localLikes, setLocalLikes] = useState(review.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLocalLikes(prev => isLiked ? prev - 1 : prev + 1);
    toast.success(isLiked ? "Like removed" : "Review liked!");
  };

  const handleComment = () => {
    if (!newComment.trim()) return;
    toast.success("Comment added!");
    setNewComment("");
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `Review by ${review.author.name}`,
        text: review.content,
        url: `https://schoolsat.com/reviews/${review.id}`
      });
    } catch (error) {
      navigator.clipboard.writeText(`https://schoolsat.com/reviews/${review.id}`);
      toast.success("Link copied to clipboard!");
    }
  };

  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half" className="h-4 w-4 fill-yellow-500 text-yellow-500" />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground" />
      );
    }

    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <img src={review.author.avatar} alt={review.author.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{review.author.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {review.author.grade} • {review.subject} • {review.teacher}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {renderRatingStars(review.rating)}
                <span className="ml-2 text-sm font-medium">
                  {review.rating}
                </span>
              </div>
            </div>

            <p className="mt-4">{review.content}</p>

            <div className="flex items-center gap-6 mt-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLike}
                className={isLiked ? "text-primary" : ""}
              >
                <ThumbsUp className={`h-4 w-4 mr-2 ${isLiked ? "fill-primary" : ""}`} />
                {localLikes}
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowComments(!showComments)}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {review.comments}
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <span className="text-sm text-muted-foreground ml-auto">
                {review.time}
              </span>
            </div>

            <AnimatePresence>
              {showComments && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 space-y-4"
                >
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <div className="flex flex-col gap-2">
                      <Button 
                        size="icon" 
                        variant="outline"
                        onClick={() => toast.success("Emoji picker coming soon!")}
                      >
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon"
                        onClick={handleComment}
                        disabled={!newComment.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}