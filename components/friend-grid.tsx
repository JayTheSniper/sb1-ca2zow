"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import { motion } from "framer-motion";

interface Friend {
  id: number;
  name: string;
  avatar: string;
  mutualFriends: number;
}

interface FriendGridProps {
  friends: Friend[];
  extended?: boolean;
  showAll?: boolean;
}

export function FriendGrid({ friends, extended = false, showAll = true }: FriendGridProps) {
  const displayFriends = showAll ? friends : friends.slice(0, 6);

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Friends</h3>
        {!extended && friends.length > 6 && (
          <Button variant="ghost" size="sm">See All</Button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {displayFriends.map((friend) => (
          <motion.div
            key={friend.id}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3"
          >
            <Avatar className="h-12 w-12">
              <img src={friend.avatar} alt={friend.name} className="object-cover" />
            </Avatar>
            <div>
              <p className="font-medium line-clamp-1">{friend.name}</p>
              <p className="text-sm text-muted-foreground">
                {friend.mutualFriends} mutual friends
              </p>
            </div>
          </motion.div>
        ))}
        {extended && (
          <Button
            variant="outline"
            className="h-auto py-6 flex flex-col items-center gap-2"
          >
            <Users className="h-6 w-6" />
            <span>Find Friends</span>
          </Button>
        )}
      </div>
    </Card>
  );
}