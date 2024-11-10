"use client";

import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Camera, Users, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

interface Profile {
  name: string;
  avatar: string;
  cover: string;
  followers: number;
  following: number;
  verified: boolean;
}

interface ProfileHeaderProps {
  profile: Profile;
  isOwnProfile: boolean;
}

export function ProfileHeader({ profile, isOwnProfile }: ProfileHeaderProps) {
  return (
    <div className="relative">
      {/* Cover Photo */}
      <div className="relative h-[300px] bg-muted">
        <img
          src={profile.cover}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {isOwnProfile && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute bottom-4 right-4"
          >
            <Camera className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Profile Info */}
      <div className="container max-w-6xl">
        <div className="relative -mt-20 mb-4 px-4">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
            <div className="relative">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Avatar className="w-32 h-32 border-4 border-background">
                  <img src={profile.avatar} alt={profile.name} className="object-cover" />
                </Avatar>
                {isOwnProfile && (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-2 right-2 h-8 w-8"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </motion.div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                {profile.verified && (
                  <BadgeCheck className="h-6 w-6 text-primary" />
                )}
              </div>
              <div className="flex items-center gap-4 text-muted-foreground mt-2">
                <span>{profile.followers.toLocaleString()} followers</span>
                <span>{profile.following.toLocaleString()} following</span>
              </div>
            </div>

            <div className="flex gap-2">
              {isOwnProfile ? (
                <Button variant="outline">Edit Profile</Button>
              ) : (
                <>
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    Follow
                  </Button>
                  <Button variant="outline">Message</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}