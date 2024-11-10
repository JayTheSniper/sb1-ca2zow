import { NextResponse } from "next/server";

export async function GET() {
  try {
    // In a real app, fetch messages from database
    const chats = [
      {
        id: 1,
        name: "Tech Academy",
        avatar: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&auto=format&fit=crop&q=60",
        lastMessage: "Looking forward to your enrollment!",
        time: "2m ago",
        unread: 2,
        online: true,
        typing: false,
        email: "tech@academy.com"
      },
      {
        id: 2,
        name: "Art Institute",
        avatar: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&auto=format&fit=crop&q=60",
        lastMessage: "Your portfolio looks great!",
        time: "1h ago",
        unread: 0,
        online: false,
        typing: false,
        email: "art@institute.com"
      }
    ];

    return NextResponse.json({ chats });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}