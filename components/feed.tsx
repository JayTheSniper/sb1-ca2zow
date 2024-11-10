"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";

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
  timestamp: string;
}

interface FeedProps {
  posts: Post[];
  onLike: (postId: number) => void;
}

export function Feed({ posts, onLike }: FeedProps) {
  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <Card key={post.id} className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar>
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
            </Avatar>
            <div>
              <h3 className="font-medium">{post.author.name}</h3>
              <p className="text-sm text-muted-foreground">{post.timestamp}</p>
            </div>
          </div>
          <p className="mb-4">{post.content}</p>
          {post.image && (
            <div className="relative h-[300px] mb-4 rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt="Post image"
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike(post.id)}
            >
              <Heart className="h-4 w-4 mr-2" />
              {post.likes}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              {post.comments}
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              {post.shares}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}