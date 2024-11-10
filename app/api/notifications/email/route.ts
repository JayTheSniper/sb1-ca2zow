"use client";

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { type, recipient, data } = await req.json();

    let subject = '';
    let content = '';

    switch (type) {
      case 'reaction':
        subject = `${data.user} reacted to your post`;
        content = `
          <h2>${data.user} reacted to your post with ${data.emoji}</h2>
          <p>Original post: "${data.postContent}"</p>
          <a href="https://schoolsat.com/posts/${data.postId}">View Post</a>
        `;
        break;

      case 'comment':
        subject = `${data.user} commented on your post`;
        content = `
          <h2>${data.user} commented on your post</h2>
          <p>Comment: "${data.comment}"</p>
          <a href="https://schoolsat.com/posts/${data.postId}">View Comment</a>
        `;
        break;

      case 'share':
        subject = `${data.user} shared your post`;
        content = `
          <h2>${data.user} shared your post</h2>
          <p>Original post: "${data.postContent}"</p>
          <a href="https://schoolsat.com/posts/${data.postId}">View Post</a>
        `;
        break;
    }

    await resend.emails.send({
      from: 'Schoolsat <notifications@schoolsat.com>',
      to: recipient,
      subject,
      html: `
        <!DOCTYPE html>
        <html>
          <body>
            ${content}
            <hr>
            <p>
              You received this email because you're subscribed to notifications from Schoolsat.
              <a href="https://schoolsat.com/settings/notifications">Manage notification settings</a>
            </p>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email notification error:', error);
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    );
  }
}