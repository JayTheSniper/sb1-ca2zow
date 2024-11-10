import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { profileId } = await req.json();

    // In a real app, save to database
    const follow = {
      id: Date.now(),
      followerId: "current-user", // Get from session
      followingId: profileId,
      timestamp: new Date().toISOString()
    };

    // Send notification to followed user
    await fetch("/api/notifications/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "new_follower",
        recipientId: profileId,
        data: {
          followerId: follow.followerId,
          timestamp: follow.timestamp
        }
      })
    });

    return NextResponse.json({ success: true, follow });
  } catch (error) {
    console.error("Follow error:", error);
    return NextResponse.json(
      { error: "Failed to follow user" },
      { status: 500 }
    );
  }
}