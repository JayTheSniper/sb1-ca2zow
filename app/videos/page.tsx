"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VideoCard } from "@/components/video-card";
import { VideoSearch } from "@/components/video-search";
import { VideoHeader } from "@/components/video-header";
import { VideoFilters } from "@/components/video-filters";
import { Video as VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function VideosPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentVideo, setCurrentVideo] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement }>({});

  const SAMPLE_VIDEOS = [
    {
      id: 1,
      url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
      title: "Math Challenge Accepted! 🧮",
      description: "Watch me solve this tricky problem! 😎",
      creator: {
        name: "Math Master",
        avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5",
        followers: 125000
      },
      likes: 15400,
      comments: 856,
      shares: 2300,
      tags: ["fun", "challenge", "trending"]
    },
    {
      id: 2,
      url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
      title: "Epic Science Experiment! 🧪",
      description: "You won't believe what happens next! 🤯",
      creator: {
        name: "Science Pro",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        followers: 98000
      },
      likes: 12300,
      comments: 645,
      shares: 1800,
      tags: ["experiment", "viral", "cool"]
    }
  ];

  const handleVideoClick = async (videoId: number) => {
    const videoElement = videoRefs.current[videoId];
    if (!videoElement) return;

    try {
      if (currentVideo === videoId) {
        if (isPlaying) {
          await videoElement.pause();
          setIsPlaying(false);
        } else {
          await videoElement.play();
          setIsPlaying(true);
        }
      } else {
        if (currentVideo) {
          const currentElement = videoRefs.current[currentVideo];
          if (currentElement) {
            await currentElement.pause();
          }
        }
        setCurrentVideo(videoId);
        await videoElement.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Video playback error:", error);
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Videos</h1>
              <p className="text-muted-foreground">
                Watch and share fun moments
              </p>
            </div>
            <Button onClick={() => router.push("/videos/upload")}>
              <VideoIcon className="h-4 w-4 mr-2" />
              Upload Video
            </Button>
          </div>

          <VideoSearch value={searchQuery} onChange={setSearchQuery} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_VIDEOS.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                isPlaying={isPlaying && currentVideo === video.id}
                isMuted={isMuted}
                onVideoClick={() => handleVideoClick(video.id)}
                onVolumeToggle={() => setIsMuted(!isMuted)}
                videoRef={(el) => el && (videoRefs.current[video.id] = el)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}