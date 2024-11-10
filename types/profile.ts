export type ProfileType = 'personal' | 'institution';

export type PersonalRole = 'student' | 'parent';
export type InstitutionRole = 'teacher' | 'school' | 'university' | 'center' | 'club' | 'education_services';

export interface Profile {
  id: string;
  type: ProfileType;
  role: PersonalRole | InstitutionRole;
  name: string;
  email: string;
  avatar?: string;
  cover?: string;
  bio?: string;
  location?: string;
  verified: boolean;
  verificationStatus: 'none' | 'pending' | 'verified' | 'rejected';
  verificationDate?: string;
  verificationDocuments?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PersonalProfile extends Profile {
  type: 'personal';
  role: PersonalRole;
  education?: string;
  grade?: string;
  parentInfo?: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface InstitutionProfile extends Profile {
  type: 'institution';
  role: InstitutionRole;
  website?: string;
  phone?: string;
  address?: string;
  registrationNumber?: string;
  accreditation?: string;
  facilities?: string[];
  programs?: string[];
  staffCount?: number;
  establishedYear?: number;
}