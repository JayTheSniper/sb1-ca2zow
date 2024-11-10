"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Mail,
  Globe,
  Pencil,
  BadgeCheck
} from "lucide-react";

interface Profile {
  name: string;
  bio: string;
  location: string;
  education: string;
  occupation: string;
  email: string;
  website: string;
  verified: boolean;
  type: "personal" | "institution";
  role: "student" | "parent" | "teacher" | "school" | "university" | "center" | "club";
}

interface AboutSectionProps {
  profile: Profile;
  extended?: boolean;
}

export function AboutSection({ profile, extended = false }: AboutSectionProps) {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold">About</h3>
        {extended && (
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          {profile.verified && (
            <BadgeCheck className="h-5 w-5 text-primary" />
          )}
          <span className="text-sm capitalize">
            {profile.type} Account • {profile.role}
          </span>
        </div>

        <p className="text-muted-foreground">{profile.bio}</p>

        <div className="space-y-3">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            {profile.location}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Briefcase className="h-4 w-4 mr-2" />
            {profile.occupation}
          </div>
          <div className="flex items-center text-muted-foreground">
            <GraduationCap className="h-4 w-4 mr-2" />
            {profile.education}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Mail className="h-4 w-4 mr-2" />
            {profile.email}
          </div>
          <div className="flex items-center text-muted-foreground">
            <Globe className="h-4 w-4 mr-2" />
            {profile.website}
          </div>
        </div>

        {extended && (
          <Button className="w-full mt-4">Edit Profile</Button>
        )}
      </div>
    </Card>
  );
}