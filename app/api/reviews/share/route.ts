import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { reviewId, platform } = await req.json();

    // In a real app, log share analytics to database
    const share = {
      id: Date.now(),
      reviewId,
      platform,
      userId: "current-user", // Get from session in real app
      timestamp: new Date().toISOString()
    };

    return NextResponse.json({ success: true, share });
  } catch (error) {
    console.error('Review share error:', error);
    return NextResponse.json(
      { error: "Failed to share review" },
      { status: 500 }
    );
  }
}