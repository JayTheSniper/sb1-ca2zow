import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET(req: Request) {
  try {
    // In a real app, fetch user profile from database
    const profile = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60",
      role: "Student",
      bio: "Student at Tech Academy | Passionate about learning and technology",
      location: "New York, NY",
      education: "Tech Academy",
      occupation: "Student",
      website: "johndoe.dev",
      socialLinks: {
        twitter: "johndoe",
        linkedin: "johndoe",
        github: "johndoe"
      },
      preferences: {
        notifications: true,
        newsletter: true,
        theme: "system"
      }
    };

    return NextResponse.json({ profile });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const profileData = await req.json();

    // In a real app, update user profile in database
    const updatedProfile = {
      ...profileData,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({ success: true, profile: updatedProfile });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user profile" },
      { status: 500 }
    );
  }
}