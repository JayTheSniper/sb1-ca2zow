"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Navigation2, Users, School } from "lucide-react";
import { Popup } from "react-map-gl";
import { Location } from "@/types/location";

interface LocationPopupProps {
  location: Location;
  onClose: () => void;
}

export function LocationPopup({ location, onClose }: LocationPopupProps) {
  return (
    <Popup
      latitude={location.latitude}
      longitude={location.longitude}
      closeOnClick={false}
      onClose={onClose}
      anchor="bottom"
      offset={15}
      className="z-50"
    >
      <Card className="p-4 min-w-[300px]">
        <div className="flex items-center gap-3 mb-4">
          {location.avatar ? (
            <Avatar>
              <img src={location.avatar} alt={location.name} className="object-cover" />
            </Avatar>
          ) : (
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              {location.type === "school" ? (
                <School className="h-5 w-5 text-primary-foreground" />
              ) : (
                <Users className="h-5 w-5 text-primary-foreground" />
              )}
            </div>
          )}
          <div>
            <h3 className="font-semibold">{location.name}</h3>
            <p className="text-sm text-muted-foreground">
              {location.description}
            </p>
          </div>
        </div>

        {location.attendees && (
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <Users className="h-4 w-4 mr-1" />
            {location.attendees.toLocaleString()} people here
          </div>
        )}

        <div className="flex gap-2">
          <Button className="flex-1">
            <Navigation2 className="h-4 w-4 mr-2" />
            Directions
          </Button>
          <Button variant="outline" className="flex-1">
            Share Location
          </Button>
        </div>
      </Card>
    </Popup>
  );
}