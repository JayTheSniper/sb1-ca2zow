"use client";

import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

const stories = [
  {
    id: "create",
    type: "create",
    user: {
      name: "Create Story",
      image: null
    }
  },
  {
    id: 1,
    type: "story",
    user: {
      name: "Jane Smith",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop"
    },
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800"
  },
  {
    id: 2,
    type: "story",
    user: {
      name: "Mike Johnson",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop"
    },
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800"
  },
  {
    id: 3,
    type: "story",
    user: {
      name: "Sarah Wilson",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop"
    },
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
  }
];

export function Stories() {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md">
      <div className="flex w-max space-x-4 p-4">
        {stories.map((story) => (
          <motion.div
            key={story.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className="relative h-48 w-32 overflow-hidden cursor-pointer group"
            >
              {story.type === "create" ? (
                <div className="flex flex-col items-center justify-center h-full bg-muted">
                  <div className="rounded-full bg-primary p-2 mb-2">
                    <Plus className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-medium">Create Story</span>
                </div>
              ) : (
                <>
                  <Image
                    src={story.image!}
                    alt={story.user.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <div className="relative h-8 w-8 mb-1">
                      <Image
                        src={story.user.image!}
                        alt={story.user.name}
                        fill
                        className="rounded-full object-cover border-2 border-primary"
                      />
                    </div>
                    <span className="text-xs text-white font-medium line-clamp-1">
                      {story.user.name}
                    </span>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}