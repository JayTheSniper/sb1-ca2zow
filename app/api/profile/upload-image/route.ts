import { NextResponse } from "next/server";
import { appendToSheet, updateSheet } from "@/lib/utils/google-sheets";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const image = formData.get('image') as File;
    const type = formData.get('type') as string;
    const userId = "current-user-id"; // Get from session in real app

    if (!image || !type) {
      return NextResponse.json(
        { error: "Image and type are required" },
        { status: 400 }
      );
    }

    // In a real app, upload image to cloud storage
    const imageUrl = `https://example.com/images/${image.name}`;

    // Update Google Sheets
    const values = [
      [
        userId,
        type === 'avatar' ? imageUrl : '',
        type === 'cover' ? imageUrl : '',
        new Date().toISOString()
      ]
    ];

    if (type === 'avatar') {
      await updateSheet('Users!D2:D', [[imageUrl]]);
    } else {
      await updateSheet('Users!E2:E', [[imageUrl]]);
    }

    return NextResponse.json({ 
      success: true,
      imageUrl
    });
  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}