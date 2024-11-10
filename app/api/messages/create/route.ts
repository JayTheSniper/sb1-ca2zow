import { NextResponse } from "next/server";
import { addSystemNotification } from "@/lib/notifications";

export async function POST(req: Request) {
  try {
    const { id, name, avatar } = await req.json();

    if (!id || !name || !avatar) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In a real app, validate user session here
    const currentUserId = "current-user"; // Get from session

    // Check if chat already exists
    const existingChatId = await checkExistingChat(currentUserId, id);
    if (existingChatId) {
      return NextResponse.json({ chatId: existingChatId });
    }

    // Create new chat
    const chatId = Date.now();

    // Send notification to recipient
    addSystemNotification({
      type: "message",
      title: "New Message",
      description: `${name} started a conversation with you`,
      time: "Just now",
      avatar: avatar
    });

    return NextResponse.json({ 
      success: true, 
      chatId 
    });
  } catch (error) {
    console.error('Create chat error:', error);
    return NextResponse.json(
      { error: "Failed to create chat" },
      { status: 500 }
    );
  }
}

// Simulated database check - replace with actual DB query in production
async function checkExistingChat(userId: string, recipientId: number): Promise<number | null> {
  // In a real app, query your database here
  return null;
}