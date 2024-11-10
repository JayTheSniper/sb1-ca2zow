import { NextResponse } from "next/server";

export async function GET() {
  try {
    // In a real app, fetch from database
    const notifications = [
      {
        id: 1,
        type: "message",
        title: "New Message",
        description: "John sent you a message",
        time: "2m ago",
        read: false,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
        link: "/messages/1"
      },
      {
        id: 2,
        type: "like",
        title: "Post Liked",
        description: "Sarah liked your post",
        time: "5m ago",
        read: false,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        link: "/posts/1"
      },
      {
        id: 3,
        type: "cart",
        title: "Item Added to Cart",
        description: "Premium Study Kit was added to your cart",
        time: "10m ago",
        read: false,
        link: "/shop/cart"
      },
      {
        id: 4,
        type: "review",
        title: "New Review",
        description: "Mike left a review on your profile",
        time: "1h ago",
        read: false,
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
        link: "/reviews"
      }
    ];

    return NextResponse.json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const notification = await req.json();

    // In a real app, save to database and broadcast to WebSocket
    const savedNotification = {
      id: Date.now(),
      ...notification,
      time: "Just now",
      read: false
    };

    return NextResponse.json({ success: true, notification: savedNotification });
  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json(
      { error: "Failed to create notification" },
      { status: 500 }
    );
  }
}