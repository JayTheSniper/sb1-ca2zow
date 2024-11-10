import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, orderId, amount } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "orders@schoolsat.com",
      to: email,
      subject: "Order Confirmation - Schoolsat Shop",
      html: `
        <h1>Thank you for your order!</h1>
        <p>Order ID: ${orderId}</p>
        <p>Amount: $${amount}</p>
        <p>We'll process your order right away.</p>
        <br>
        <p>Best regards,</p>
        <p>The Schoolsat Team</p>
      `,
    });

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send confirmation email" },
      { status: 500 }
    );
  }
}