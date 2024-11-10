"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Phone, Video, Mic, MicOff, VideoOff, X } from "lucide-react";

interface CallOverlayProps {
  type: 'audio' | 'video';
  chat: {
    name: string;
    avatar: string;
  };
  onEnd: () => void;
}

export function CallOverlay({ type, chat, onEnd }: CallOverlayProps) {
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <Card className="p-8 max-w-md w-full text-center">
        <div className="space-y-6">
          <Avatar className="w-24 h-24 mx-auto">
            <img src={chat.avatar} alt={chat.name} className="object-cover" />
          </Avatar>

          <div>
            <h2 className="text-2xl font-bold">{chat.name}</h2>
            <p className="text-muted-foreground">
              {type === 'audio' ? 'Audio Call' : 'Video Call'} • {formatDuration(duration)}
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? (
                <MicOff className="h-6 w-6" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </Button>

            {type === 'video' && (
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full"
                onClick={() => setIsVideoOff(!isVideoOff)}
              >
                {isVideoOff ? (
                  <VideoOff className="h-6 w-6" />
                ) : (
                  <Video className="h-6 w-6" />
                )}
              </Button>
            )}

            <Button
              variant="destructive"
              size="icon"
              className="h-12 w-12 rounded-full"
              onClick={onEnd}
            >
              <Phone className="h-6 w-6 rotate-[135deg]" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}