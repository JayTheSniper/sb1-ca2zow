"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Photo {
  id: number;
  url: string;
  caption: string;
}

interface PhotoGridProps {
  photos: Photo[];
  extended?: boolean;
  showAll?: boolean;
}

export function PhotoGrid({ photos, extended = false, showAll = true }: PhotoGridProps) {
  const displayPhotos = showAll ? photos : photos.slice(0, 6);

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Photos</h3>
        {!extended && photos.length > 6 && (
          <Button variant="ghost" size="sm">See All</Button>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {displayPhotos.map((photo) => (
          <motion.div
            key={photo.id}
            whileHover={{ scale: 1.05 }}
            className="aspect-square rounded-lg overflow-hidden cursor-pointer"
          >
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        {extended && (
          <Button
            variant="outline"
            className="aspect-square flex flex-col items-center justify-center gap-2"
          >
            <ImageIcon className="h-6 w-6" />
            <span>Upload Photo</span>
          </Button>
        )}
      </div>
    </Card>
  );
}