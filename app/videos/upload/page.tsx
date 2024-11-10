"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Upload, ArrowLeft, Video, X, Image as ImageIcon, Play, Music2 } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoUploadPage() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [soundtrack, setSoundtrack] = useState("");
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 200 * 1024 * 1024) { // 200MB limit for short videos
        toast.error("Video file size must be less than 200MB");
        return;
      }
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Thumbnail size must be less than 5MB");
        return;
      }
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile) {
      toast.error("Please select a video file");
      return;
    }

    setIsUploading(true);
    try {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + 5;
        });
      }, 500);

      const formData = new FormData();
      formData.append("video", videoFile);
      if (thumbnail) formData.append("thumbnail", thumbnail);
      formData.append("caption", caption);
      formData.append("soundtrack", soundtrack);

      await new Promise(resolve => setTimeout(resolve, 3000));

      clearInterval(interval);
      setProgress(100);
      toast.success("Video uploaded successfully!");
      router.push("/videos");
    } catch (error) {
      toast.error("Failed to upload video");
    } finally {
      setIsUploading(false);
    }
  };

  const clearVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
  };

  const clearThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container py-6">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push("/videos")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Videos
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Video Preview Side */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Video className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold">Upload Short Video</h1>
                  <p className="text-muted-foreground">
                    Share your moments with the community
                  </p>
                </div>
              </div>

              <AnimatePresence>
                {!videoPreview ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-2 border-dashed rounded-lg aspect-[9/16] flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                  >
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      id="video"
                      onChange={handleVideoSelect}
                      disabled={isUploading}
                    />
                    <label htmlFor="video" className="cursor-pointer text-center">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <span className="text-lg font-medium block mb-2">
                        Select video to upload
                      </span>
                      <span className="text-sm text-muted-foreground block">
                        MP4 or MOV
                      </span>
                      <span className="text-sm text-muted-foreground block">
                        Up to 200MB • 15s to 3min
                      </span>
                    </label>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative aspect-[9/16] rounded-lg overflow-hidden bg-black"
                  >
                    <video
                      ref={videoRef}
                      src={videoPreview}
                      className="w-full h-full object-contain"
                      controls
                      loop
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={clearVideo}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6">
                <Label className="mb-2 block">Cover Image</Label>
                {thumbnailPreview ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={clearThumbnail}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="thumbnail"
                      onChange={handleThumbnailSelect}
                      disabled={isUploading}
                    />
                    <label htmlFor="thumbnail" className="cursor-pointer">
                      <ImageIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Choose cover image
                      </span>
                    </label>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Form Side */}
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="caption">Caption</Label>
                  <Textarea
                    id="caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Write an engaging caption..."
                    className="min-h-[120px]"
                    maxLength={300}
                  />
                  <p className="text-sm text-muted-foreground text-right">
                    {caption.length}/300
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Music2 className="h-4 w-4" />
                    Add Soundtrack
                  </Label>
                  <Input
                    value={soundtrack}
                    onChange={(e) => setSoundtrack(e.target.value)}
                    placeholder="Search or paste a link"
                  />
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <h3 className="font-medium mb-2">Video Tips</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Keep videos between 15s and 3min</li>
                    <li>• Vertical format works best</li>
                    <li>• Add trending music to boost engagement</li>
                    <li>• Use relevant hashtags in caption</li>
                  </ul>
                </div>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-sm text-center text-muted-foreground">
                    Uploading... {progress}%
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isUploading || !videoFile}
                size="lg"
              >
                {isUploading ? (
                  "Uploading..."
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Post Video
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}