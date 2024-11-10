import { NextResponse } from "next/server";

export async function GET() {
  try {
    // In a real app, fetch latest updates from database
    const updates = {
      type: 'updates',
      payload: {
        messages: [],
        notifications: [],
        timestamp: new Date().toISOString()
      }
    };

    return NextResponse.json(updates);
  } catch (error) {
    console.error('Error fetching updates:', error);
    return NextResponse.json(
      { error: "Failed to fetch updates" },
      { status: 500 }
    );
  }
}