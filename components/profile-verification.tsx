"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, Upload, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface ProfileVerificationProps {
  profileType: 'personal' | 'institution';
  currentStatus: 'none' | 'pending' | 'verified' | 'rejected';
}

export function ProfileVerification({ profileType, currentStatus }: ProfileVerificationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [documents, setDocuments] = useState<FileList | null>(null);

  const personalRoles = [
    { value: "student", label: "Student" },
    { value: "parent", label: "Parent" },
  ];

  const institutionRoles = [
    { value: "teacher", label: "Teacher" },
    { value: "school", label: "School" },
    { value: "university", label: "University" },
    { value: "center", label: "Educational Center" },
    { value: "club", label: "Club" },
    { value: "education_services", label: "Education Services" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!documents || documents.length === 0) {
      toast.error("Please upload required documents");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('type', profileType);
    formData.append('role', selectedRole);
    Array.from(documents).forEach(doc => {
      formData.append('documents', doc);
    });

    try {
      const response = await fetch('/api/profile/verify', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Verification request failed');

      toast.success("Verification request submitted successfully");
    } catch (error) {
      toast.error("Failed to submit verification request");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (currentStatus === 'verified') {
    return (
      <Card className="p-6 bg-green-50 dark:bg-green-900/10">
        <div className="flex items-center gap-4">
          <Shield className="h-8 w-8 text-green-600" />
          <div>
            <h3 className="font-semibold text-green-600">Verified Account</h3>
            <p className="text-sm text-green-600/80">
              Your account has been verified. You have access to all features.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (currentStatus === 'pending') {
    return (
      <Card className="p-6 bg-yellow-50 dark:bg-yellow-900/10">
        <div className="flex items-center gap-4">
          <AlertCircle className="h-8 w-8 text-yellow-600" />
          <div>
            <h3 className="font-semibold text-yellow-600">Verification Pending</h3>
            <p className="text-sm text-yellow-600/80">
              Your verification request is being reviewed. This usually takes 1-2 business days.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-4">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h3 className="font-semibold">Verify Your Account</h3>
            <p className="text-sm text-muted-foreground">
              Get verified to access all features and build trust with the community
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Select Role</Label>
            <Select
              value={selectedRole}
              onValueChange={setSelectedRole}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                {(profileType === 'personal' ? personalRoles : institutionRoles)
                  .map(role => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Upload Verification Documents</Label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors">
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                id="documents"
                onChange={(e) => setDocuments(e.target.files)}
              />
              <label htmlFor="documents" className="cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Upload ID or relevant documents
                </span>
              </label>
            </div>
            <p className="text-xs text-muted-foreground">
              Accepted formats: PDF, JPG, PNG. Max size: 5MB per file.
            </p>
          </div>

          <div className="text-sm text-muted-foreground">
            <h4 className="font-medium mb-2">Required Documents:</h4>
            {profileType === 'personal' ? (
              <ul className="list-disc list-inside space-y-1">
                <li>Government-issued ID (Student ID for students)</li>
                <li>Proof of enrollment (for students)</li>
                <li>Parent/Guardian ID (for minors)</li>
              </ul>
            ) : (
              <ul className="list-disc list-inside space-y-1">
                <li>Business registration certificate</li>
                <li>Educational institution license</li>
                <li>Accreditation documents</li>
                <li>Tax registration certificate</li>
              </ul>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit for Verification"}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          By submitting, you agree to our verification process and understand that your documents
          will be reviewed by our team.
        </p>
      </form>
    </Card>
  );
}