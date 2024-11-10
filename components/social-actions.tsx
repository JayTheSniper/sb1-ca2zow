"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialActionsProps {
  initialLikes?: number;
  initialComments?: number;
  postId: number;
  onComment?: () => void;
}

export function SocialActions({
  initialLikes = 0,
  initialComments = 0,
  postId,
  onComment,
}: SocialActionsProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div className="flex items-center gap-2 pt-2">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "flex items-center gap-1 px-2",
          liked && "text-primary"
        )}
        onClick={handleLike}
      >
        <Heart className={cn("h-4 w-4", liked && "fill-primary")} />
        {likes > 0 && <span className="text-sm">{likes}</span>}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-1 px-2"
        onClick={onComment}
      >
        <MessageCircle className="h-4 w-4" />
        {initialComments > 0 && <span className="text-sm">{initialComments}</span>}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-1 px-2"
        onClick={() => {
          navigator.clipboard.writeText(`${window.location.origin}/reviews/${postId}`);
        }}
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  );
}