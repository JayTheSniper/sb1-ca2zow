"use client";

import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface LocationAvatarProps {
  name: string;
  avatar?: string;
  isSharing?: boolean;
  className?: string;
}

export function LocationAvatar({ name, avatar, isSharing, className }: LocationAvatarProps) {
  return (
    <div className="relative">
      <Avatar className={cn("h-12 w-12", className)}>
        {avatar ? (
          <img src={avatar} alt={name} className="object-cover" />
        ) : (
          <div className="h-full w-full bg-primary flex items-center justify-center text-primary-foreground">
            {name[0]}
          </div>
        )}
      </Avatar>
      {isSharing && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
      )}
    </div>
  );
}