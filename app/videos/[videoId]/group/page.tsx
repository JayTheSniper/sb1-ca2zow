"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send, Users, Crown, Settings } from "lucide-react";
import { toast } from "sonner";

export default function GroupWatchPage({ params }: { params: { videoId: string } }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isHost, setIsHost] = useState(true);

  // In a real app, fetch these from API
  const [participants] = useState([
    {
      id: 1,
      name: "You (Host)",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
      isHost: true
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      isHost: false
    },
    {
      id: 3,
      name: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      isHost: false
    }
  ]);

  const [messages] = useState([
    {
      id: 1,
      user: "Jane Smith",
      message: "Great explanation in this part!",
      time: "2 min ago"
    },
    {
      id: 2,
      user: "Mike Johnson",
      message: "Could you pause at 2:30? I have a question.",
      time: "1 min ago"
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // In a real app, send message through WebSocket
    toast.success("Message sent!");
    setMessage("");
  };

  const handleInvite = () => {
    // Generate invite link
    const inviteLink = `${window.location.origin}/videos/${params.videoId}/group/join`;
    navigator.clipboard.writeText(inviteLink);
    toast.success("Invite link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container py-6">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push("/videos")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Leave Group Watch
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-3">
            <Card className="aspect-video bg-black"></Card>
            <div className="mt-4 flex gap-2">
              {isHost && (
                <>
                  <Button variant="outline" onClick={handleInvite}>
                    <Users className="h-4 w-4 mr-2" />
                    Invite Others
                  </Button>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Group Settings
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Participants */}
            <Card className="p-4">
              <h3 className="font-medium mb-4 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Participants ({participants.length})
              </h3>
              <div className="space-y-4">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <img src={participant.avatar} alt={participant.name} />
                      </Avatar>
                      <div>
                        <p className="font-medium flex items-center">
                          {participant.name}
                          {participant.isHost && (
                            <Crown className="h-4 w-4 ml-1 text-yellow-500" />
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Chat */}
            <Card className="flex flex-col h-[400px]">
              <div className="p-4 border-b">
                <h3 className="font-medium">Group Chat</h3>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="flex flex-col">
                      <p className="text-sm font-medium">{msg.user}</p>
                      <p className="text-sm">{msg.message}</p>
                      <span className="text-xs text-muted-foreground">
                        {msg.time}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button type="submit">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}