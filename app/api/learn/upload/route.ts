import { NextResponse } from "next/server";
import { appendToSheet } from "@/lib/utils/google-sheets";

export async function POST(req: Request) {
  try {
    const formData = await FormData.from(req);
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;
    const subject = formData.get('subject') as string;

    if (!file || !type || !subject) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In a real app, upload file to cloud storage
    const fileUrl = `https://storage.example.com/${file.name}`;

    // Log to Google Sheets
    const values = [
      [
        new Date().toISOString(),
        file.name,
        type,
        subject,
        fileUrl,
        "pending" // approval status
      ]
    ];

    await appendToSheet('Resources!A:F', values);

    return NextResponse.json({ 
      success: true,
      fileUrl
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}