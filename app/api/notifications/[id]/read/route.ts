import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    // In a real app, update in database
    const notification = {
      id,
      read: true,
      readAt: new Date().toISOString()
    };

    return NextResponse.json({ success: true, notification });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return NextResponse.json(
      { error: "Failed to mark notification as read" },
      { status: 500 }
    );
  }
}