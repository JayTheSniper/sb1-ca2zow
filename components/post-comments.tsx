"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MoreHorizontal, Send } from "lucide-react";

interface Comment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  likes: number;
  time: string;
}

interface PostCommentsProps {
  postId: number;
  comments: Comment[];
  onComment: (content: string) => void;
  onLike: (commentId: number) => void;
  onDelete: (commentId: number) => void;
}

export function PostComments({ postId, comments, onComment, onLike, onDelete }: PostCommentsProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Avatar className="w-8 h-8">
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop" alt="Your avatar" />
        </Avatar>
        <div className="flex-1 flex gap-2">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[2.5rem] py-2"
          />
          <Button type="submit" size="icon" disabled={!newComment.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-2">
            <Avatar className="w-8 h-8">
              <img src={comment.author.avatar} alt={comment.author.name} />
            </Avatar>
            <div className="flex-1">
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex justify-between items-start">
                  <span className="font-medium">{comment.author.name}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
              <div className="flex items-center gap-4 mt-1 text-sm">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0"
                  onClick={() => onLike(comment.id)}
                >
                  <Heart className="h-4 w-4 mr-1" />
                  {comment.likes}
                </Button>
                <span className="text-muted-foreground">{comment.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}