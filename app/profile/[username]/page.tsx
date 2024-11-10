import { Metadata } from "next";
import { ProfileHeader } from "@/components/profile-header";
import { PostList } from "@/components/post-list";
import { AboutSection } from "@/components/about-section";
import { PhotoGrid } from "@/components/photo-grid";
import { FriendGrid } from "@/components/friend-grid";

// This ensures all possible usernames are pre-rendered at build time
export async function generateStaticParams() {
  // In a real app, fetch this from your API/database
  const usernames = [
    'sarah-wilson',
    'john-doe',
    'jane-smith',
    'mike-johnson',
    'emma-davis'
  ];

  return usernames.map((username) => ({
    username,
  }));
}

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  // In a real app, fetch user data from your API
  const name = params.username.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return {
    title: `${name} - Profile | Schoolsat`,
    description: `View ${name}'s profile on Schoolsat`,
  };
}

export default function ProfilePage({ params }: { params: { username: string } }) {
  // In a real app, fetch this data from your API based on username
  const profile = {
    name: params.username.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' '),
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800",
    cover: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800",
    bio: "Student at Tech Academy | Passionate about learning and technology",
    location: "New York, NY",
    education: "Tech Academy",
    occupation: "Student",
    email: `${params.username}@example.com`,
    website: `${params.username}.dev`,
    followers: 1250,
    following: 890,
    verified: true,
    type: "personal" as const,
    role: "student" as const
  };

  const posts = [
    {
      id: 1,
      author: {
        name: profile.name,
        username: params.username,
        avatar: profile.avatar
      },
      content: "Just finished my first web development project! 🚀",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
      likes: 124,
      comments: [],
      shares: 15,
      time: "2 hours ago"
    }
  ];

  const photos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
      caption: "Coding session"
    }
  ];

  const friends = [
    {
      id: 1,
      name: "Jane Smith",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80",
      mutualFriends: 12
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <ProfileHeader 
        profile={profile}
        isOwnProfile={false}
      />

      <div className="container max-w-6xl py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-6">
            <AboutSection profile={profile} />
            <PhotoGrid photos={photos} showAll={true} />
            <FriendGrid friends={friends} showAll={true} />
          </div>

          <div className="md:col-span-2">
            <PostList posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
}