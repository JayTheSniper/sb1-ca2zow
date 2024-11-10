import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, orderId, items, total } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "Schoolsat Shop <orders@schoolsat.com>",
      to: email,
      subject: "Order Confirmation - Schoolsat Shop",
      html: `
        <h1>Thank you for your order!</h1>
        <p>Your order (${orderId}) has been confirmed and will be shipped shortly.</p>
        
        <h2>Order Details:</h2>
        <ul>
          ${items.map((item: any) => `
            <li>${item.description} - $${(item.amount_total / 100).toFixed(2)}</li>
          `).join("")}
        </ul>
        
        <p><strong>Total:</strong> $${total.toFixed(2)}</p>
        
        <p>We'll send you another email when your order ships.</p>
        
        <p>Best regards,<br>The Schoolsat Team</p>
      `,
    });

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return NextResponse.json(
      { error: "Failed to send confirmation email" },
      { status: 500 }
    );
  }
}