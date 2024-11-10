import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // In a real app, fetch cart items from database
    const cartItems = [
      {
        id: 1,
        name: "Premium Study Kit",
        price: 149.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6"
      }
    ];

    return NextResponse.json({ cartItems });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cart items" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { productId, quantity } = await req.json();

    // In a real app, add item to cart in database
    const cartItem = {
      id: productId,
      quantity
    };

    return NextResponse.json({ success: true, cartItem });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { productId } = await req.json();

    // In a real app, remove item from cart in database

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove item from cart" },
      { status: 500 }
    );
  }
}