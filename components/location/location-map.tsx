"use client";

import { useState, useEffect } from "react";
import Map, { Marker, NavigationControl, GeolocateControl } from "react-map-gl";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LocationMarker } from "./location-marker";
import { LocationPopup } from "./location-popup";
import { type Location } from "@/types/location";
import "mapbox-gl/dist/mapbox-gl.css";

interface LocationMapProps {
  locations: Location[];
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
  onShare: (location: Location) => void;
}

export function LocationMap({ 
  locations, 
  selectedLocation, 
  onLocationSelect,
  onShare 
}: LocationMapProps) {
  const [viewState, setViewState] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
    zoom: 12
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
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

  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    >
      <GeolocateControl position="top-right" />
      <NavigationControl position="top-right" />

      {locations.map((location) => (
        <Marker
          key={location.id}
          latitude={location.latitude}
          longitude={location.longitude}
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            onLocationSelect(location);
          }}
        >
          <LocationMarker type={location.type} />
        </Marker>
      ))}

      {selectedLocation && (
        <LocationPopup
          location={selectedLocation}
          onClose={() => onLocationSelect(null)}
          onShare={() => onShare(selectedLocation)}
        />
      )}
    </Map>
  );
}