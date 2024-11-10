export type LocationType = "school" | "event" | "user";

export interface Location {
  id: number;
  type: LocationType;
  name: string;
  latitude: number;
  longitude: number;
  avatar?: string;
  description?: string;
  attendees?: number;
  lastActive?: string;
  isSharing?: boolean;
}