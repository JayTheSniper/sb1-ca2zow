import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    // In a real app, fetch from database
    const profiles = {
      "sarah-wilson": {
        id: "1",
        name: "Sarah Wilson",
        username: "sarah-wilson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        cover: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e",
        bio: "Student at Tech Academy | Passionate about Mathematics and Physics",
        location: "New York, NY",
        school: "Tech Academy",
        grade: "10th Grade",
        subjects: ["Mathematics", "Physics", "Computer Science"],
        achievements: [
          "Math Competition Winner 2023",
          "Science Fair Gold Medal",
          "Perfect Attendance"
        ],
        stats: {
          rating: 4.8,
          reviews: 48,
          friends: 156,
          posts: 89
        },
        photos: [
          {
            id: 1,
            url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
            caption: "Coding session"
          }
        ],
        friends: [
          {
            id: 1,
            name: "Jane Smith",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            mutualFriends: 12
          }
        ],
        posts: [
          {
            id: 1,
            content: "Just finished my first web development project! 🚀",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
            likes: 124,
            comments: [],
            shares: 15,
            time: "2 hours ago",
            author: {
              name: "Sarah Wilson",
              username: "sarah-wilson",
              avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
            }
          }
        ]
      }
    };

    const profile = profiles[params.username];
    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}