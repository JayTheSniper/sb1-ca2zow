"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { MapPin, Navigation2, Users, School } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = "YOUR_MAPBOX_TOKEN"; // Replace with your token

interface Location {
  id: number;
  type: "school" | "event" | "user";
  name: string;
  latitude: number;
  longitude: number;
  avatar?: string;
  description?: string;
  attendees?: number;
}

export function LocationMap() {
  const [viewState, setViewState] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
    zoom: 12
  });

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  const [locations] = useState<Location[]>([
    {
      id: 1,
      type: "school",
      name: "Tech Academy",
      latitude: 40.7128,
      longitude: -74.0060,
      avatar: "https://images.unsplash.com/photo-1531482615713-2afd69097998",
      description: "Leading technology institution",
      attendees: 1200
    },
    {
      id: 2,
      type: "event",
      name: "Coding Workshop",
      latitude: 40.7200,
      longitude: -74.0100,
      description: "Learn to code with experts",
      attendees: 50
    }
  ]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.longitude, position.coords.latitude]);
          setViewState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 12
          });
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  }, []);

  const handleMarkerClick = useCallback((location: Location) => {
    setSelectedLocation(location);
  }, []);

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <GeolocateControl position="top-right" />
        <NavigationControl position="top-right" />

        {locations.map((location) => (
          <Marker
            key={location.id}
            latitude={location.latitude}
            longitude={location.longitude}
            onClick={() => handleMarkerClick(location)}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer"
            >
              {location.type === "school" ? (
                <div className="bg-primary text-primary-foreground p-2 rounded-full">
                  <School className="h-5 w-5" />
                </div>
              ) : (
                <div className="bg-secondary text-secondary-foreground p-2 rounded-full">
                  <Users className="h-5 w-5" />
                </div>
              )}
            </motion.div>
          </Marker>
        ))}

        <AnimatePresence>
          {selectedLocation && (
            <Popup
              latitude={selectedLocation.latitude}
              longitude={selectedLocation.longitude}
              closeOnClick={false}
              onClose={() => setSelectedLocation(null)}
              anchor="bottom"
              offset={15}
            >
              <Card className="p-4 min-w-[300px]">
                <div className="flex items-center gap-3 mb-4">
                  {selectedLocation.avatar ? (
                    <Avatar>
                      <img src={selectedLocation.avatar} alt={selectedLocation.name} />
                    </Avatar>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                      {selectedLocation.type === "school" ? (
                        <School className="h-5 w-5 text-primary-foreground" />
                      ) : (
                        <Users className="h-5 w-5 text-primary-foreground" />
                      )}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">{selectedLocation.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedLocation.description}
                    </p>
                  </div>
                </div>

                {selectedLocation.attendees && (
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Users className="h-4 w-4 mr-1" />
                    {selectedLocation.attendees} people here
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
          )}
        </AnimatePresence>
      </Map>

      {/* Location Cards */}
      <div className="absolute top-4 left-4 right-4">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {locations.map((location) => (
            <Card
              key={location.id}
              className="p-4 min-w-[300px] cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleMarkerClick(location)}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  {location.avatar ? (
                    <img src={location.avatar} alt={location.name} />
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
                  {location.attendees} people here
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}