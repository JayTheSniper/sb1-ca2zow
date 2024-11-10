import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Get user ID from session/token
    const userId = "current-user"; // Replace with actual auth logic

    // In a real app, fetch unread count from database
    const unreadMessages = [
      { id: 1, senderId: 2, content: "Hey there!", timestamp: new Date() },
      { id: 2, senderId: 3, content: "Check this out!", timestamp: new Date() }
    ];

    return NextResponse.json({ 
      count: unreadMessages.length,
      messages: unreadMessages 
    });
  } catch (error) {
    console.error('Error fetching unread messages:', error);
    return NextResponse.json(
      { error: "Failed to fetch unread messages" },
      { status: 500 }
    );
  }
}