"use client";

import { ProfileSettings } from "@/components/profile-settings";

export default function AppearancePage() {
  return (
    <div className="container max-w-4xl py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Appearance Settings</h1>
          <p className="text-muted-foreground">
            Customize how Schoolsat looks for you
          </p>
        </div>

        <ProfileSettings />
      </div>
    </div>
  );
}