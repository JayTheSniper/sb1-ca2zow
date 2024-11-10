"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { ArrowLeft, Star, Send } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function WriteReviewPage() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!subject || !teacher || !review) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      // In a real app, send to API
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Review submitted successfully!");
      router.push("/reviews");
    } catch (error) {
      toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container max-w-2xl py-6">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push("/reviews")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Reviews
        </Button>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Write a Review</h1>
              <p className="text-muted-foreground">
                Share your experience to help others
              </p>
            </div>

            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="text-2xl focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoverRating || rating)
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Mathematics, Physics"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="teacher">Teacher</Label>
              <Input
                id="teacher"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                placeholder="Teacher's name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="review">Your Review</Label>
              <Textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your experience..."
                className="min-h-[200px]"
              />
              <p className="text-sm text-muted-foreground text-right">
                {review.length}/1000
              </p>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Review
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
}