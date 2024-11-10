import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { type, recipientId, data } = await req.json();

    // In a real app, save notification to database
    const notification = {
      id: Date.now(),
      type,
      recipientId,
      data,
      read: false,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json({ success: true, notification });
  } catch (error) {
    console.error('Notification error:', error);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
}