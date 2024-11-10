"use client";

import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { MapPin, Users, School } from "lucide-react";
import { Location } from "@/types/location";
import { motion } from "framer-motion";

interface LocationCardProps {
  location: Location;
  onClick: (location: Location) => void;
}

export function LocationCard({ location, onClick }: LocationCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className="p-4 min-w-[300px] cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => onClick(location)}
      >
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            {location.avatar ? (
              <img src={location.avatar} alt={location.name} className="object-cover" />
            ) : (
              <div className="h-full w-full bg-primary flex items-center justify-center">
                <School className="h-6 w-6 text-primary-foreground" />
              </div>
            )}
          </Avatar>
          <div>
            <h3 className="font-semibold">{location.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              Nearby
            </div>
          </div>
        </div>
        {location.description && (
          <p className="mt-2 text-sm text-muted-foreground">
            {location.description}
          </p>
        )}
        {location.attendees && (
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            {location.attendees.toLocaleString()} people here
          </div>
        )}
      </Card>
    </motion.div>
  );
}