"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";

const stripePromise = loadStripe("gqciiblscmvjxdqlwytn");

export default function CheckoutPage({ params }: { params: { courseId: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    // In a real app, fetch course details from API
    setCourse({
      id: parseInt(params.courseId),
      name: "Web Development Bootcamp",
      school: "Tech Academy",
      price: 1499,
      duration: "12 weeks"
    });
  }, [params.courseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to initialize.");

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: course.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!course) return null;

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container max-w-4xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Checkout</h1>
              <p className="text-muted-foreground">Complete your enrollment</p>
            </div>

            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" required />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? "Processing..." : `Proceed to Payment ($${course.price})`}
                </Button>
              </form>
            </Card>
          </div>

          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">{course.name}</span>
                  <span>${course.price}</span>
                </div>
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Duration</span>
                  <span>{course.duration}</span>
                </div>
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Institution</span>
                  <span>{course.school}</span>
                </div>

                <hr className="border-t" />
                
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${course.price}</span>
                </div>
              </div>

              <div className="mt-6 text-sm text-muted-foreground">
                <p>By completing this purchase you agree to our terms of service and refund policy.</p>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}