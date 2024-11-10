"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { EmojiPicker } from "@/components/emoji-picker";
import { 
  Image, 
  Video, 
  Smile, 
  Camera, 
  Link as LinkIcon,
  X
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CreatePostProps {
  onPost: (content: string) => void;
}

export function CreatePost({ onPost }: CreatePostProps) {
  const [content, setContent] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<File[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() || selectedMedia.length > 0) {
      onPost(content);
      setContent("");
      setSelectedMedia([]);
    }
  };

  const handleMediaSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedMedia(prev => [...prev, ...files]);
  };

  const removeMedia = (index: number) => {
    setSelectedMedia(prev => prev.filter((_, i) => i !== index));
  };

  const startLiveVideo = () => {
    setIsLive(true);
    // Implement live video streaming logic
  };

  const addEmoji = (emoji: string) => {
    setContent(prev => prev + emoji);
  };

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start gap-4">
          <Avatar>
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"
              alt="User avatar"
            />
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] mb-4"
            />

            {selectedMedia.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                {selectedMedia.map((file, index) => (
                  <div key={index} className="relative">
                    {file.type.startsWith('image/') ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Selected media"
                        className="rounded-lg w-full h-32 object-cover"
                      />
                    ) : (
                      <video
                        src={URL.createObjectURL(file)}
                        className="rounded-lg w-full h-32 object-cover"
                        controls
                      />
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => removeMedia(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleMediaSelect}
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Image className="h-4 w-4 mr-2" />
                  Photo
                </Button>

                <input
                  type="file"
                  accept="video/*"
                  multiple
                  className="hidden"
                  ref={videoInputRef}
                  onChange={handleMediaSelect}
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => videoInputRef.current?.click()}
                >
                  <Video className="h-4 w-4 mr-2" />
                  Video
                </Button>

                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={startLiveVideo}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Live
                </Button>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                    >
                      <Smile className="h-4 w-4 mr-2" />
                      Emoji
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0">
                    <EmojiPicker onSelect={addEmoji} />
                  </PopoverContent>
                </Popover>

                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                >
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Link
                </Button>
              </div>

              <Button 
                type="submit" 
                disabled={!content.trim() && selectedMedia.length === 0}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
}