"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { PostInteractions } from "@/components/post-interactions";
import { ShareDialog } from "@/components/share-dialog";
import { PostComments } from "@/components/post-comments";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Post {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  time: string;
}

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);

  const handleReaction = (emoji: string) => {
    // Handle reaction
  };

  const handleComment = () => {
    setShowComments(true);
  };

  const handleShare = () => {
    setShowShareDialog(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <img src={post.author.avatar} alt={post.author.name} />
            </Avatar>
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">{post.time}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <p className="mb-4">{post.content}</p>

        {post.image && (
          <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
            <img
              src={post.image}
              alt="Post image"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <PostInteractions
          postId={post.id}
          onReaction={handleReaction}
          onComment={handleComment}
          onShare={handleShare}
          initialReactions={{}}
          initialComments={post.comments}
          initialShares={post.shares}
        />

        {showComments && (
          <div className="mt-4">
            <PostComments
              postId={post.id}
              comments={[]}
              onComment={() => {}}
              onLike={() => {}}
              onDelete={() => {}}
            />
          </div>
        )}

        <ShareDialog
          open={showShareDialog}
          onOpenChange={setShowShareDialog}
          post={post}
        />
      </Card>
    </motion.div>
  );
}