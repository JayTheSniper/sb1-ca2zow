import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { reviewId, emoji } = await req.json();

    // In a real app, save reaction to database
    const reaction = {
      id: Date.now(),
      reviewId,
      emoji,
      userId: "current-user", // Get from session in real app
      timestamp: new Date().toISOString()
    };

    return NextResponse.json({ success: true, reaction });
  } catch (error) {
    console.error('Review reaction error:', error);
    return NextResponse.json(
      { error: "Failed to add reaction" },
      { status: 500 }
    );
  }
}