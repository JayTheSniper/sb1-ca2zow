"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { 
  Minus, 
  Plus, 
  Trash2, 
  ArrowLeft,
  CreditCard
} from "lucide-react";
import { toast } from "sonner";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Premium Study Kit",
      price: 149.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=60"
    }
  ]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 9.99;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            name: item.name,
            description: `Quantity: ${item.quantity}`,
            price: item.price,
            quantity: item.quantity,
            image: item.image
          }))
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { sessionId } = await response.json();
      const stripe = await getStripe();
      
      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) {
        throw error;
      }

    } catch (error: any) {
      toast.error(error.message || "Failed to process checkout");
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container py-6">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push("/shop")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
              
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Your cart is empty</p>
                  <Button 
                    className="mt-4"
                    onClick={() => router.push("/shop")}
                  >
                    Browse Products
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center gap-4 py-4 border-b last:border-0"
                    >
                      <div
                        className="w-24 h-24 bg-cover bg-center rounded-lg"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-muted-foreground">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          <div>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button 
                className="w-full mt-6"
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Checkout
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Secure checkout powered by Stripe
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}