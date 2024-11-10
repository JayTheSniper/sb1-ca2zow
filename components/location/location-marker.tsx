"use client";

import { motion } from "framer-motion";
import { School, Users } from "lucide-react";
import { LocationType } from "@/types/location";

interface LocationMarkerProps {
  type: LocationType;
}

export function LocationMarker({ type }: LocationMarkerProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="cursor-pointer"
    >
      {type === "school" ? (
        <div className="bg-primary text-primary-foreground p-2 rounded-full shadow-lg">
          <School className="h-5 w-5" />
        </div>
      ) : (
        <div className="bg-secondary text-secondary-foreground p-2 rounded-full shadow-lg">
          <Users className="h-5 w-5" />
        </div>
      )}
    </motion.div>
  );
}