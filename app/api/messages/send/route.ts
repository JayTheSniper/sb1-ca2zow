import { NextResponse } from "next/server";
import { WebSocketServer } from 'ws';

export async function POST(req: Request) {
  try {
    const message = await req.json();

    // In a real app, save message to database
    const savedMessage = {
      ...message,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };

    // Broadcast to WebSocket clients if available
    const wss = (global as any).wss as WebSocketServer;
    if (wss) {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocketServer.OPEN) {
          client.send(JSON.stringify({
            type: 'new_message',
            payload: savedMessage
          }));
        }
      });
    }

    return NextResponse.json({ success: true, message: savedMessage });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}