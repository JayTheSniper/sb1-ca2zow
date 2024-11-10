"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReviewCard } from "@/components/review-card";
import { useRouter } from "next/navigation";
import { Search, Star, Filter } from "lucide-react";

export default function ReviewsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const reviews = [
    {
      id: 1,
      author: {
        name: "Sarah Wilson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        grade: "10th Grade"
      },
      subject: "Mathematics",
      teacher: "Mr. Johnson",
      rating: 4.8,
      content: "Excellent teaching methods! The interactive exercises really helped me understand complex concepts.",
      likes: 48,
      comments: 12,
      time: "2 days ago",
      helpful: 35
    },
    {
      id: 2,
      author: {
        name: "Mike Thompson",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
        grade: "11th Grade"
      },
      subject: "Physics",
      teacher: "Ms. Davis",
      rating: 4.5,
      content: "Great explanations of difficult topics. The lab experiments were particularly engaging.",
      likes: 32,
      comments: 8,
      time: "1 week ago",
      helpful: 28
    }
  ];

  const filteredReviews = reviews.filter(review =>
    review.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Reviews & Ratings</h1>
              <p className="text-muted-foreground">
                Share your learning experience and help others
              </p>
            </div>
            <Button onClick={() => router.push("/reviews/write")}>
              <Star className="h-4 w-4 mr-2" />
              Write Review
            </Button>
          </div>

          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search reviews by subject, teacher, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}