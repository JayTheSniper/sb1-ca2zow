"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { 
  MessageCircle, 
  UserPlus, 
  MapPin, 
  GraduationCap, 
  Trophy,
  Star,
  Users,
  BookOpen,
  Share2
} from "lucide-react";
import { PostList } from "@/components/post-list";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface ProfileViewProps {
  profile: {
    id: string;
    name: string;
    avatar: string;
    cover: string;
    bio: string;
    location: string;
    school: string;
    grade: string;
    subjects: string[];
    achievements: string[];
    stats: {
      rating: number;
      reviews: number;
      friends: number;
      posts: number;
    };
  };
}

export function ProfileView({ profile }: ProfileViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [isFollowing, setIsFollowing] = useState(false);

  const handleMessage = async () => {
    try {
      const response = await fetch("/api/messages/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientId: profile.id,
          recipientName: profile.name,
          recipientAvatar: profile.avatar
        })
      });

      if (!response.ok) throw new Error();

      const { chatId } = await response.json();
      router.push(`/messages/${chatId}`);
    } catch (error) {
      toast.error("Failed to start conversation");
    }
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(isFollowing ? "Unfollowed successfully" : "Following successfully");
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${profile.name}'s Profile`,
          text: profile.bio,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Profile link copied to clipboard!");
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        toast.error("Failed to share profile");
      }
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Cover Photo */}
      <div className="relative h-[300px] bg-muted">
        <img
          src={profile.cover}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="container max-w-6xl">
        <div className="relative -mt-20 mb-6 px-4">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <Avatar className="w-32 h-32 border-4 border-background">
                <img src={profile.avatar} alt={profile.name} className="object-cover" />
              </Avatar>
            </motion.div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              <p className="text-muted-foreground">{profile.bio}</p>
              <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {profile.location}
                </div>
                <div className="flex items-center">
                  <GraduationCap className="h-4 w-4 mr-1" />
                  {profile.school} • {profile.grade}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleMessage}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button variant="outline" onClick={handleFollow}>
                <UserPlus className="h-4 w-4 mr-2" />
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="px-4">
          <Card className="p-6 mb-6">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{profile.stats.rating}</div>
                <div className="text-sm text-muted-foreground flex items-center justify-center">
                  <Star className="h-4 w-4 mr-1" />
                  Rating
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">{profile.stats.reviews}</div>
                <div className="text-sm text-muted-foreground">Reviews</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{profile.stats.friends}</div>
                <div className="text-sm text-muted-foreground">Friends</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{profile.stats.posts}</div>
                <div className="text-sm text-muted-foreground">Posts</div>
              </div>
            </div>
          </Card>

          <Tabs defaultValue="overview" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="friends">Friends</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Subjects
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Trophy className="h-5 w-5 mr-2" />
                    Recent Achievements
                  </h3>
                  <div className="space-y-4">
                    {profile.achievements.map((achievement) => (
                      <div
                        key={achievement}
                        className="flex items-center gap-2"
                      >
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="posts" className="mt-6">
              <PostList posts={[]} />
            </TabsContent>

            <TabsContent value="achievements" className="mt-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">All Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profile.achievements.map((achievement) => (
                    <Card
                      key={achievement}
                      className="p-4 flex items-center gap-4"
                    >
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Trophy className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{achievement}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="friends" className="mt-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Friends</h3>
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    See All
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Friend cards would go here */}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}