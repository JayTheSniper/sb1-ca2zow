import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe("gqciiblscmvjxdqlwytn", {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: item.description,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/shop`,
      metadata: {
        orderId: `order_${Date.now()}`,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}