import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // In a real app, fetch user preferences from database
    const preferences = {
      notifications: true,
      newsletter: true,
      theme: "system",
      language: "en",
      timezone: "America/New_York",
      currency: "USD"
    };

    return NextResponse.json({ preferences });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user preferences" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { preferences } = await req.json();

    // In a real app, update user preferences in database
    const updatedPreferences = {
      ...preferences,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({ success: true, preferences: updatedPreferences });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user preferences" },
      { status: 500 }
    );
  }
}