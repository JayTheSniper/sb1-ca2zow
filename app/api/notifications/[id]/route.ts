import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const { read } = await req.json();

    // In a real app, update in database
    const notification = {
      id,
      read,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({ success: true, notification });
  } catch (error) {
    console.error('Error updating notification:', error);
    return NextResponse.json(
      { error: "Failed to update notification" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    // In a real app, delete from database
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting notification:', error);
    return NextResponse.json(
      { error: "Failed to delete notification" },
      { status: 500 }
    );
  }
}