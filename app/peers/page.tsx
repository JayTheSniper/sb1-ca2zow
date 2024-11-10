"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { 
  Search,
  UserPlus,
  Star,
  BookOpen,
  GraduationCap,
  MapPin,
  MessageCircle,
  Filter,
  StarHalf
} from "lucide-react";

export default function PeersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const peers = [
    {
      id: 1,
      name: "Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      school: "Tech Academy",
      grade: "10th Grade",
      subjects: ["Mathematics", "Physics", "Computer Science"],
      location: "2.5 km away",
      rating: 4.8,
      reviews: 48,
      studyHours: 120,
      online: true
    },
    {
      id: 2,
      name: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      school: "Science High",
      grade: "11th Grade",
      subjects: ["Biology", "Chemistry", "Mathematics"],
      location: "3.8 km away",
      rating: 4.7,
      reviews: 32,
      studyHours: 95,
      online: false
    }
  ];

  const filteredPeers = peers.filter(peer =>
    peer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    peer.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
    peer.subjects.some(subject => 
      subject.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half" className="h-4 w-4 fill-yellow-500 text-yellow-500" />
      );
    }

    // Empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground" />
      );
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Study Peers</h1>
              <p className="text-muted-foreground">
                Connect with students near you and study together
              </p>
            </div>
            <Button onClick={() => router.push("/peers/find")}>
              <UserPlus className="h-4 w-4 mr-2" />
              Find Peers
            </Button>
          </div>

          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search peers by name, school, or subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPeers.map((peer) => (
              <Card key={peer.id} className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16">
                      <img src={peer.avatar} alt={peer.name} className="object-cover" />
                    </Avatar>
                    {peer.online && (
                      <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{peer.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <GraduationCap className="h-4 w-4 mr-1" />
                      {peer.school}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {peer.grade}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {peer.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
                    >
                      {subject}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      {renderRatingStars(peer.rating)}
                    </div>
                    <span className="text-muted-foreground">
                      {peer.reviews} reviews
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {peer.location}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => router.push(`/messages/${peer.id}`)}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}