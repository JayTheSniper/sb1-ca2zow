"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/order-details?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          setOrderDetails(data);
        })
        .catch(console.error);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="p-6">
          <div className="text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
            <h1 className="text-2xl font-bold">Payment Successful!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. A confirmation email has been sent to your inbox.
            </p>

            {orderDetails && (
              <div className="mt-6 text-left space-y-2">
                <h2 className="font-semibold">Order Details</h2>
                <p>Order ID: {orderDetails.orderId}</p>
                <p>Amount: ${orderDetails.amount}</p>
              </div>
            )}

            <div className="flex flex-col gap-2 mt-6">
              <Button onClick={() => router.push("/shop")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Return to Shop
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}