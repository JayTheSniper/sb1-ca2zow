"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { NotificationBadge } from "@/components/notification-badge";
import { 
  Bell, 
  MessageCircle, 
  Heart, 
  Share2, 
  UserPlus, 
  ShoppingBag,
  Star 
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface NotificationsProps {
  count: number;
}

export function Notifications({ count }: NotificationsProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageCircle className="h-5 w-5 text-primary" />;
      case 'like':
        return <Heart className="h-5 w-5 text-primary" />;
      case 'follow':
        return <UserPlus className="h-5 w-5 text-primary" />;
      case 'cart':
        return <ShoppingBag className="h-5 w-5 text-primary" />;
      case 'review':
        return <Star className="h-5 w-5 text-primary" />;
      case 'share':
        return <Share2 className="h-5 w-5 text-primary" />;
      default:
        return <Bell className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {count > 0 && <NotificationBadge count={count} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-semibold">Notifications</h4>
          {count > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                // Mark all as read logic here
                toast.success("All notifications marked as read");
              }}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {count === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No notifications
            </div>
          ) : (
            <div className="divide-y">
              {/* Notification items would be mapped here */}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}