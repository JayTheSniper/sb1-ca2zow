"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LocationMap } from "@/components/location/location-map";
import { LocationPreview } from "@/components/location/location-preview";
import { MapPin, Users } from "lucide-react";
import { toast } from "sonner";
import { type Location } from "@/types/location";

export default function FriendsLocationPage() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  const [locations] = useState<Location[]>([
    {
      id: 1,
      type: "user",
      name: "John Doe",
      latitude: 40.7128,
      longitude: -74.0060,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
      description: "At the library",
      lastActive: "2 minutes ago",
      isSharing: true
    },
    {
      id: 2,
      type: "user",
      name: "Jane Smith",
      latitude: 40.7200,
      longitude: -74.0100,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      description: "Coffee break",
      lastActive: "5 minutes ago",
      isSharing: true
    }
  ]);

  const toggleLocationSharing = () => {
    setIsSharing(!isSharing);
    toast.success(isSharing ? "Location sharing stopped" : "Location sharing started");
  };

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      <div className="absolute top-4 left-4 right-4 z-10 flex gap-4">
        <Card className="p-4 flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant={isSharing ? "default" : "outline"}
                onClick={toggleLocationSharing}
              >
                <MapPin className="h-4 w-4 mr-2" />
                {isSharing ? "Stop Sharing" : "Share Location"}
              </Button>
              <span className="text-sm text-muted-foreground">
                {isSharing ? "Your location is visible to friends" : "Location sharing is off"}
              </span>
            </div>
            <Button variant="outline" size="icon">
              <Users className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>

      <div className="absolute top-20 left-4 right-4 z-10">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {locations.map((location) => (
            <LocationPreview
              key={location.id}
              location={location}
              onClick={setSelectedLocation}
            />
          ))}
        </div>
      </div>

      <LocationMap
        locations={locations}
        selectedLocation={selectedLocation}
        onLocationSelect={setSelectedLocation}
        onShare={(location) => {
          const message = `Check out my location at Schoolsat: https://schoolsat.com/location/${location.id}`;
          if (navigator.share) {
            navigator.share({
              title: "My Location",
              text: message,
              url: `https://schoolsat.com/location/${location.id}`
            }).catch(console.error);
          } else {
            navigator.clipboard.writeText(message);
            toast.success("Location link copied to clipboard!");
          }
        }}
      />
    </div>
  );
}