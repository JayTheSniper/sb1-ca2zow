"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Facebook, 
  Twitter, 
  Instagram,
  Link as LinkIcon, 
  Copy, 
  Share2,
  MessageCircle,
  Camera,
  Globe,
  QrCode,
  Send
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: {
    id: number;
    content: string;
    author: {
      name: string;
    };
  };
}

export function ShareDialog({ open, onOpenChange, post }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/posts/${post.id}`;
  const shareText = `Check out ${post.author.name}'s post: ${post.content}`;

  const socialPlatforms = [
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-[#E4405F] hover:bg-[#E4405F]/90',
      url: `instagram://share?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Snapchat',
      icon: Camera,
      color: 'bg-[#FFFC00] hover:bg-[#FFFC00]/90 text-black',
      url: `snapchat://share?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2] hover:bg-[#1877F2]/90',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-[#1DA1F2] hover:bg-[#1DA1F2]/90',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-[#0088cc] hover:bg-[#0088cc]/90',
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
    },
    {
      name: 'Web Share',
      icon: Globe,
      color: 'bg-primary hover:bg-primary/90',
      action: async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Schoolsat Post',
              text: shareText,
              url: shareUrl,
            });
            toast.success('Shared successfully!');
          } catch (err) {
            if ((err as Error).name !== 'AbortError') {
              toast.error('Failed to share');
            }
          }
        } else {
          toast.error('Web Share not supported');
        }
      }
    }
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const handleShare = (platform: typeof socialPlatforms[0]) => {
    if (platform.action) {
      platform.action();
    } else if (platform.url) {
      window.open(platform.url, '_blank', 'noopener,noreferrer');
    }
    toast.success(`Shared on ${platform.name}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Post</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="social" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="link">Copy Link</TabsTrigger>
            <TabsTrigger value="qr">QR Code</TabsTrigger>
          </TabsList>

          <TabsContent value="social" className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mt-4">
              {socialPlatforms.map((platform) => (
                <motion.div
                  key={platform.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className={`w-full ${platform.color} text-white`}
                    onClick={() => handleShare(platform)}
                  >
                    <platform.icon className="h-4 w-4 mr-2" />
                    {platform.name}
                  </Button>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="link">
            <div className="flex space-x-2">
              <div className="grid flex-1 gap-2">
                <Input
                  value={shareUrl}
                  readOnly
                  className="w-full"
                />
              </div>
              <Button
                size="icon"
                className="px-3"
                onClick={handleCopy}
              >
                <span className="sr-only">Copy</span>
                {copied ? (
                  <Copy className="h-4 w-4" />
                ) : (
                  <LinkIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="qr">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white p-4 rounded-lg">
                <QrCode className="h-32 w-32" />
              </div>
              <Button 
                variant="outline" 
                onClick={() => toast.success("QR Code downloaded")}
              >
                Download QR Code
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Share this post to spread the knowledge!</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}