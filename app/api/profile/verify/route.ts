import { NextResponse } from "next/server";
import { appendToSheet, updateSheet } from "@/lib/utils/google-sheets";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const userId = formData.get('userId') as string;
    const type = formData.get('type') as string;
    const role = formData.get('role') as string;
    const documents = formData.getAll('documents') as File[];

    if (!userId || !type || !role || documents.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In a real app, upload documents to secure storage
    const documentUrls = documents.map(doc => `https://example.com/docs/${doc.name}`);

    // Update verification status in Google Sheets
    const values = [
      [
        userId,
        'pending',
        new Date().toISOString(),
        documentUrls.join(','),
        type,
        role
      ]
    ];

    await appendToSheet('Verifications!A:F', values);

    return NextResponse.json({ 
      success: true,
      message: "Verification request submitted successfully"
    });
  } catch (error) {
    console.error('Verification request error:', error);
    return NextResponse.json(
      { error: "Failed to submit verification request" },
      { status: 500 }
    );
  }
}