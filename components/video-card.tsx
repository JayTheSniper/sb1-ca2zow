"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { SocialActions } from "@/components/social-actions";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";

interface VideoCardProps {
  video: {
    id: number;
    url: string;
    thumbnail: string;
    title: string;
    description: string;
    creator: {
      name: string;
      avatar: string;
      followers: number;
    };
    likes: number;
    comments: number;
    shares: number;
    tags: string[];
  };
  isPlaying: boolean;
  isMuted: boolean;
  onVideoClick: () => void;
  onVolumeToggle: () => void;
  videoRef: (el: HTMLVideoElement | null) => void;
}

export function VideoCard({
  video,
  isPlaying,
  isMuted,
  onVideoClick,
  onVolumeToggle,
  videoRef
}: VideoCardProps) {
  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const videoElement = videoRef as unknown as HTMLVideoElement;
    if (videoElement && videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative aspect-[9/16] rounded-xl overflow-hidden"
    >
      <Card 
        className="h-full cursor-pointer group"
        onClick={onVideoClick}
      >
        <video
          ref={videoRef}
          src={video.url}
          poster={video.thumbnail}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline // Important for mobile devices
          preload="metadata" // Only load metadata initially
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-16 w-16 rounded-full bg-black/50 hover:bg-black/70"
          >
            {isPlaying ? (
              <Pause className="h-8 w-8 text-white" />
            ) : (
              <Play className="h-8 w-8 text-white" />
            )}
          </Button>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border-2 border-white">
                <img src={video.creator.avatar} alt={video.creator.name} />
              </Avatar>
              <div>
                <h3 className="text-white font-semibold text-sm">
                  {video.creator.name}
                </h3>
                <p className="text-white/80 text-xs">
                  {video.creator.followers.toLocaleString()} followers
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-black/20"
                onClick={(e) => {
                  e.stopPropagation();
                  onVolumeToggle();
                }}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-black/20"
                onClick={handleFullscreen}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <p className="text-white text-sm mt-2">
            {video.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-white/20 text-white px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          <SocialActions
            initialLikes={video.likes}
            initialComments={video.comments}
            postId={video.id}
            className="mt-4"
            light
          />
        </div>
      </Card>
    </motion.div>
  );
}