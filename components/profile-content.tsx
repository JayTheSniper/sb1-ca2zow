"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AboutSection } from "@/components/about-section";
import { PostList } from "@/components/post-list";
import { PhotoGrid } from "@/components/photo-grid";
import { FriendGrid } from "@/components/friend-grid";

interface ProfileContentProps {
  profile: {
    name: string;
    bio: string;
    location: string;
    education: string;
    occupation: string;
    email: string;
    website: string;
    verified: boolean;
    type: "personal" | "institution";
    role: string;
  };
}

export function ProfileContent({ profile }: ProfileContentProps) {
  const [activeTab, setActiveTab] = useState("posts");

  const posts = [
    {
      id: 1,
      content: "Just finished my first web development project! 🚀",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
      likes: 124,
      comments: [],
      shares: 15,
      time: "2 hours ago"
    }
  ];

  const photos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
      caption: "Coding session"
    }
  ];

  const friends = [
    {
      id: 1,
      name: "Jane Smith",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80",
      mutualFriends: 12
    }
  ];

  return (
    <div className="container max-w-6xl py-6">
      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList className="w-full">
          <TabsTrigger value="posts" className="flex-1">
            Posts
          </TabsTrigger>
          <TabsTrigger value="about" className="flex-1">
            About
          </TabsTrigger>
          <TabsTrigger value="photos" className="flex-1">
            Photos
          </TabsTrigger>
          <TabsTrigger value="friends" className="flex-1">
            Friends
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-6">
            <AboutSection profile={profile} />
            <PhotoGrid photos={photos.slice(0, 6)} showAll={activeTab !== 'photos'} />
            <FriendGrid friends={friends.slice(0, 6)} showAll={activeTab !== 'friends'} />
          </div>

          <div className="md:col-span-2 space-y-6">
            <TabsContent value="posts" className="space-y-6 mt-0">
              <PostList posts={posts} />
            </TabsContent>

            <TabsContent value="about" className="mt-0">
              <AboutSection profile={profile} extended />
            </TabsContent>

            <TabsContent value="photos" className="mt-0">
              <PhotoGrid photos={photos} extended />
            </TabsContent>

            <TabsContent value="friends" className="mt-0">
              <FriendGrid friends={friends} extended />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}