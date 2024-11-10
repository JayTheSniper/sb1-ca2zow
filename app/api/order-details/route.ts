import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe("gqciiblscmvjxdqlwytn", {
  apiVersion: "2023-10-16",
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const orderId = session.metadata?.orderId;
    const amount = session.amount_total ? session.amount_total / 100 : 0;

    // Send confirmation email
    await fetch("/api/send-confirmation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: session.customer_details?.email,
        orderId,
        amount,
      }),
    });

    return NextResponse.json({
      orderId,
      amount,
      customerEmail: session.customer_details?.email,
    });
  } catch (error) {
    console.error("Error retrieving order details:", error);
    return NextResponse.json(
      { error: "Failed to retrieve order details" },
      { status: 500 }
    );
  }
}