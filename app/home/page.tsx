import { Suspense } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Stories } from "@/components/stories";
import { CreatePost } from "@/components/create-post";
import { PostList } from "@/components/post-list";
import { ClientWrapper } from "@/components/client-wrapper";

const posts = [
  {
    id: 1,
    author: {
      name: "John Doe",
      username: "john-doe",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80"
    },
    content: "Just started my first day at Stanford University! 🎓",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
    likes: 124,
    comments: [],
    shares: 45,
    time: "2h ago"
  },
  {
    id: 2,
    author: {
      name: "Jane Smith",
      username: "jane-smith",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80",
    },
    content: "Great study session at the library today 📚",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800",
    likes: 89,
    comments: [],
    shares: 23,
    time: "1h ago"
  }
];

export default function HomePage() {
  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <ClientWrapper>
            <Stories />
          </ClientWrapper>
          <CreatePost />
          <ScrollArea className="h-[calc(100vh-300px)]">
            <Suspense fallback={<div>Loading posts...</div>}>
              <PostList posts={posts} />
            </Suspense>
          </ScrollArea>
        </div>

        <div className="hidden lg:block">
          {/* Trending topics or suggestions can go here */}
        </div>
      </div>
    </div>
  );
}