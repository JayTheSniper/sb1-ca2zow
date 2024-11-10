import { NextResponse } from "next/server";
import { appendToSheet } from "@/lib/utils/google-sheets";

export async function POST(req: Request) {
  try {
    const userData = await req.json();
    const timestamp = new Date().toISOString();

    // Save user data to Google Sheets
    const values = [
      [
        timestamp,
        userData.name,
        userData.email,
        userData.role,
        userData.education,
        userData.location,
        userData.avatar || "",
        "active"
      ]
    ];

    await appendToSheet('Users!A:H', values);

    // In a real app, also save to your database and handle authentication
    const user = {
      id: Date.now(),
      ...userData,
      createdAt: timestamp
    };

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}