import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PUT(req: Request) {
  try {
    const { messageId, status } = await req.json();

    if (!messageId || !status) {
      return NextResponse.json(
        { error: "Message ID and status are required" },
        { status: 400 }
      );
    }

    // In a real app, update message status in database
    const message = await db.messages.update({
      where: { id: messageId },
      data: { status }
    });

    // Notify WebSocket server about status update
    await fetch('http://localhost:3001/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'status',
        messageId,
        status
      })
    });

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Error updating message status:", error);
    return NextResponse.json(
      { error: "Failed to update message status" },
      { status: 500 }
    );
  }
}