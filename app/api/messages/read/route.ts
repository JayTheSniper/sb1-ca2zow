import { NextResponse } from "next/server";
import { WebSocketServer } from 'ws';

export async function POST(req: Request) {
  try {
    const { messageIds } = await req.json();

    // In a real app, update message status in database
    const updatedMessages = messageIds.map((id: number) => ({
      id,
      status: 'read',
      readAt: new Date().toISOString()
    }));

    // Notify all connected clients about read status
    const wss = (global as any).wss as WebSocketServer;
    if (wss) {
      const notification = {
        type: 'message_status',
        payload: {
          messageIds,
          status: 'read',
          timestamp: new Date().toISOString()
        }
      };

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocketServer.OPEN) {
          client.send(JSON.stringify(notification));
        }
      });
    }

    return NextResponse.json({ 
      success: true, 
      messages: updatedMessages 
    });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    return NextResponse.json(
      { error: "Failed to update message status" },
      { status: 500 }
    );
  }
}