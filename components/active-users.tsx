"use client";

import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

const activeUsers = [
  {
    id: 1,
    name: "John Doe",
    image: "1535713875002-d1d0cf377fde"
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "1494790108377-be9c29b29330"
  },
  {
    id: 3,
    name: "Mike Johnson",
    image: "1599566150163-29194dcaad36"
  }
];

export function ActiveUsers() {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Active Now</h3>
      <div className="space-y-4">
        {activeUsers.map((user) => (
          <div key={user.id} className="flex items-center gap-3">
            <div className="relative">
              <Avatar>
                <img 
                  src={`https://images.unsplash.com/photo-${user.image}?w=80&h=80&fit=crop`} 
                  alt={`${user.name}'s avatar`}
                />
              </Avatar>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            </div>
            <div>
              <p className="font-medium text-sm">{user.name}</p>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}