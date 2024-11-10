"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingBag, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

interface ProductActionsProps {
  productId: number;
  sellerId: string;
  sellerName: string;
}

export function ProductActions({ productId, sellerId, sellerName }: ProductActionsProps) {
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleAddToCart = async () => {
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId })
      });

      if (!response.ok) throw new Error();

      toast.success("Added to cart!");

      // Send notification to seller
      await fetch("/api/notifications/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "new_cart_item",
          recipientId: sellerId,
          data: { productId }
        })
      });
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setSending(true);
    try {
      const response = await fetch("/api/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientId: sellerId,
          content: message,
          productId
        })
      });

      if (!response.ok) throw new Error();

      toast.success("Message sent!");
      setMessage("");
      setShowMessageDialog(false);
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <Button className="flex-1" onClick={handleAddToCart}>
          <ShoppingBag className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
        <Button variant="outline" onClick={() => setShowMessageDialog(true)}>
          <MessageCircle className="h-4 w-4 mr-2" />
          Message Seller
        </Button>
      </div>

      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message to {sellerName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px]"
            />
            <Button 
              className="w-full" 
              onClick={handleSendMessage}
              disabled={sending || !message.trim()}
            >
              <Send className="h-4 w-4 mr-2" />
              {sending ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}