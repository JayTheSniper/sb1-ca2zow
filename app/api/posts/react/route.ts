import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { postId, emoji } = await req.json();

    // In a real app, save reaction to database
    // For demo, we'll just simulate the process

    // Get post author's email for notification
    const authorEmail = "author@example.com"; // Get from database in real app

    // Send email notification
    await fetch('/api/notifications/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'reaction',
        recipient: authorEmail,
        data: {
          user: "Current User", // Get from session in real app
          emoji,
          postId,
          postContent: "Post content..." // Get from database in real app
        }
      })
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Reaction error:', error);
    return NextResponse.json(
      { error: 'Failed to add reaction' },
      { status: 500 }
    );
  }
}