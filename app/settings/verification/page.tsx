"use client";

import { useState, useEffect } from "react";
import { ProfileVerification } from "@/components/profile-verification";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, AlertCircle } from "lucide-react";

export default function VerificationPage() {
  const [profileType, setProfileType] = useState<'personal' | 'institution'>('personal');
  const [verificationStatus, setVerificationStatus] = useState<'none' | 'pending' | 'verified' | 'rejected'>('none');

  useEffect(() => {
    // In a real app, fetch verification status from API
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/profile/verification-status');
        const data = await response.json();
        setVerificationStatus(data.status);
      } catch (error) {
        console.error('Failed to fetch verification status:', error);
      }
    };

    fetchStatus();
  }, []);

  return (
    <div className="container max-w-4xl py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Account Verification</h1>
          <p className="text-muted-foreground">
            Verify your account to unlock all features and build trust
          </p>
        </div>

        <Card className="p-6">
          <Tabs defaultValue="personal" onValueChange={(value) => setProfileType(value as 'personal' | 'institution')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal Account</TabsTrigger>
              <TabsTrigger value="institution">Institution Account</TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="personal">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Shield className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Personal Verification</h3>
                      <p className="text-sm text-muted-foreground">
                        For students and parents
                      </p>
                    </div>
                  </div>

                  <ProfileVerification 
                    profileType="personal"
                    currentStatus={verificationStatus}
                  />
                </div>
              </TabsContent>

              <TabsContent value="institution">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Shield className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Institution Verification</h3>
                      <p className="text-sm text-muted-foreground">
                        For schools, universities, and educational organizations
                      </p>
                    </div>
                  </div>

                  <ProfileVerification 
                    profileType="institution"
                    currentStatus={verificationStatus}
                  />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </Card>

        <Card className="p-6 bg-muted">
          <h3 className="font-semibold mb-4">Benefits of Verification</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Personal Accounts</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Enhanced profile visibility</li>
                <li>• Access to exclusive features</li>
                <li>• Priority support</li>
                <li>• Verified badge on profile</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Institution Accounts</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Official institution status</li>
                <li>• Advanced analytics</li>
                <li>• Student management tools</li>
                <li>• Marketing opportunities</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}