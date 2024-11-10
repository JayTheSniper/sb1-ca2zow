"use client";

import { Card } from "@/components/ui/card";
import { Location } from "@/types/location";
import { motion } from "framer-motion";
import { LocationAvatar } from "./location-avatar";
import { LocationInfo } from "./location-info";

interface LocationPreviewProps {
  location: Location;
  onClick: (location: Location) => void;
}

export function LocationPreview({ location, onClick }: LocationPreviewProps) {
  const { name, avatar, type, isSharing, description, lastActive } = location;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group"
    >
      <Card 
        className="p-4 flex items-center gap-4 cursor-pointer min-w-[300px] transition-shadow hover:shadow-md"
        onClick={() => onClick(location)}
      >
        <LocationAvatar 
          name={name}
          avatar={avatar}
          isSharing={type === "user" && isSharing}
        />
        <LocationInfo
          name={name}
          description={description}
          lastActive={lastActive}
        />
      </Card>
    </motion.div>
  );
}