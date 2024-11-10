"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Share2, Send, Smile } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface Post {
  id: number;
  content: string;
  image?: string;
  likes: number;
  comments: {
    id: number;
    user: {
      name: string;
      avatar: string;
    };
    content: string;
    likes: number;
    time: string;
  }[];
  shares: number;
  time: string;
  author?: {
    name: string;
    username: string;
    avatar: string;
  };
}

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  const router = useRouter();
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");

  const handleComment = (postId: number) => {
    if (!newComment.trim()) return;
    // Add comment logic here
    setNewComment("");
  };

  const handleViewProfile = (username: string) => {
    router.push(`/profile/${username}`);
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id} className="p-4">
          {post.author && (
            <div 
              className="flex items-center gap-3 mb-4 cursor-pointer"
              onClick={() => handleViewProfile(post.author!.username)}
            >
              <Avatar>
                <img src={post.author.avatar} alt={post.author.name} className="object-cover" />
              </Avatar>
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{post.time}</p>
              </div>
            </div>
          )}

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

          <div className="flex items-center justify-between border-t border-b py-2 mb-4">
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              {post.likes}
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              {post.comments.length}
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              {post.shares}
            </Button>
          </div>

          <AnimatePresence>
            {expandedPost === post.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-4 overflow-hidden"
              >
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-3">
                    <Avatar>
                      <img src={comment.user.avatar} alt={comment.user.name} />
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted rounded-lg p-3">
                        <p className="font-medium">{comment.user.name}</p>
                        <p>{comment.content}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <button>Like</button>
                        <button>Reply</button>
                        <span>{comment.time}</span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex items-center gap-2">
                  <Avatar>
                    <img src="/path-to-user-avatar.jpg" alt="Your avatar" />
                  </Avatar>
                  <div className="flex-1 flex gap-2">
                    <Input
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="shrink-0"
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      onClick={() => handleComment(post.id)}
                      className="shrink-0"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      ))}
    </div>
  );
}