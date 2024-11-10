import { NextResponse } from "next/server";
import { appendToSheet, updateSheet } from "@/lib/utils/google-sheets";

export async function POST(req: Request) {
  try {
    const { profile } = await req.json();

    // Save to local database (implement your database logic here)
    // ...

    // Sync with Google Sheets
    const values = [
      [
        profile.id,
        profile.name,
        profile.email,
        profile.role,
        profile.bio,
        profile.location,
        profile.education,
        profile.occupation,
        new Date().toISOString(),
      ],
    ];

    await appendToSheet('Profiles!A:I', values);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error syncing profile:', error);
    return NextResponse.json(
      { error: "Failed to sync profile" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { profile } = await req.json();

    // Update local database (implement your database logic here)
    // ...

    // Update Google Sheets
    const values = [
      [
        profile.name,
        profile.email,
        profile.role,
        profile.bio,
        profile.location,
        profile.education,
        profile.occupation,
        new Date().toISOString(),
      ],
    ];

    await updateSheet(`Profiles!B${profile.rowIndex}:I${profile.rowIndex}`, values);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}