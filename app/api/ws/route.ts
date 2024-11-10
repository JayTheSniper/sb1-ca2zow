import { NextResponse } from "next/server";
import { WebSocketServer } from 'ws';

let wss: WebSocketServer;

if (!wss) {
  wss = new WebSocketServer({ 
    port: 3001,
    path: '/ws',
    clientTracking: true 
  });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send welcome message
    ws.send(JSON.stringify({
      type: 'connection_status',
      payload: { status: 'connected', timestamp: new Date().toISOString() }
    }));

    ws.on('message', (data) => {
      try {
        const message = JSON.parse(data.toString());
        
        // Broadcast to all connected clients except sender
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocketServer.OPEN) {
            client.send(JSON.stringify(message));
          }
        });

        // Send acknowledgment to sender
        ws.send(JSON.stringify({
          type: 'message_ack',
          payload: { messageId: message.id, status: 'delivered' }
        }));
      } catch (error) {
        console.error('Error processing message:', error);
        ws.send(JSON.stringify({
          type: 'error',
          payload: { message: 'Failed to process message' }
        }));
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      ws.close();
    });
  });

  // Keep connections alive with ping/pong
  setInterval(() => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocketServer.OPEN) {
        client.ping();
        client.send(JSON.stringify({ type: 'ping' }));
      }
    });
  }, 30000);

  // Store WSS instance globally for access from other routes
  (global as any).wss = wss;
}

export async function GET() {
  return NextResponse.json({ status: 'WebSocket server running' });
}