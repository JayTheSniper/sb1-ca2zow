import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // In a real app, fetch products from database
    const products = [
      {
        id: 1,
        name: "Premium Study Kit",
        category: "Study Materials",
        rating: 4.7,
        sold: 1250,
        price: 149.99,
        delivery: "2-3 days",
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
        features: ["Textbooks", "Digital Resources", "Study Guides"],
        description: "Complete study materials for advanced learning",
        inStock: true
      }
    ];

    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const productData = await req.json();

    // In a real app, save product to database
    const product = {
      id: Date.now(),
      ...productData
    };

    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}