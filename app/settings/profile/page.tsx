"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { 
  Globe,
  Lock,
  Users,
  Save,
  User,
  MapPin,
  Mail,
  Link,
  GraduationCap,
  Briefcase
} from "lucide-react";

export default function ProfileSettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacySettings, setPrivacySettings] = useState({
    profile: "public",
    posts: "friends",
    photos: "friends"
  });

  const [profile, setProfile] = useState({
    name: "John Doe",
    bio: "Student at Tech Academy | Passionate about learning and technology",
    location: "New York, NY",
    education: "Tech Academy",
    occupation: "Student",
    email: "john.doe@example.com",
    website: "johndoe.dev"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, privacySettings })
      });

      if (!response.ok) throw new Error();

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-4xl py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your profile information and privacy settings
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Your location"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="education">Education</Label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="education"
                    placeholder="Your education"
                    value={profile.education}
                    onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="occupation">Occupation</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="occupation"
                    placeholder="Your occupation"
                    value={profile.occupation}
                    onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <Link className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="website"
                    placeholder="Your website"
                    value={profile.website}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label>Who can see your profile?</Label>
                <Select
                  value={privacySettings.profile}
                  onValueChange={(value) => 
                    setPrivacySettings({ ...privacySettings, profile: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        Everyone
                      </div>
                    </SelectItem>
                    <SelectItem value="friends">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Friends Only
                      </div>
                    </SelectItem>
                    <SelectItem value="private">
                      <div className="flex items-center">
                        <Lock className="h-4 w-4 mr-2" />
                        Only Me
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Who can see your posts?</Label>
                <Select
                  value={privacySettings.posts}
                  onValueChange={(value) => 
                    setPrivacySettings({ ...privacySettings, posts: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        Everyone
                      </div>
                    </SelectItem>
                    <SelectItem value="friends">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Friends Only
                      </div>
                    </SelectItem>
                    <SelectItem value="private">
                      <div className="flex items-center">
                        <Lock className="h-4 w-4 mr-2" />
                        Only Me
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Who can see your photos?</Label>
                <Select
                  value={privacySettings.photos}
                  onValueChange={(value) => 
                    setPrivacySettings({ ...privacySettings, photos: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        Everyone
                      </div>
                    </SelectItem>
                    <SelectItem value="friends">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Friends Only
                      </div>
                    </SelectItem>
                    <SelectItem value="private">
                      <div className="flex items-center">
                        <Lock className="h-4 w-4 mr-2" />
                        Only Me
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            <Save className="h-4 w-4 mr-2" />
            {isSubmitting ? "Saving Changes..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}