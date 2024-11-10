import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { reviewId, content } = await req.json();

    // In a real app, save comment to database
    const comment = {
      id: Date.now(),
      reviewId,
      content,
      userId: "current-user", // Get from session in real app
      timestamp: new Date().toISOString()
    };

    return NextResponse.json({ success: true, comment });
  } catch (error) {
    console.error('Review comment error:', error);
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 }
    );
  }
}