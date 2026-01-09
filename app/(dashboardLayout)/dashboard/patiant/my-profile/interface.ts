export type PatientHealthData = {
  gender?: "MALE" | "FEMALE";
  dateOfBirth?: string;
  bloodGroup?: string;
  hasAllergies?: boolean | null;
  hasDiabetes?: boolean | null;
  height?: string;
  weight?: string;
  smokingStatus?: boolean | null;
  dietaryPreferences?: string | null;
  pregnancyStatus?: boolean | null;
  mentalHealthHistory?: string | null;
  immunizationStatus?: string | null;
  hasPastSurgeries?: boolean | null;
  recentAnxiety?: boolean | null;
  recentDepression?: boolean | null;
  maritalStatus?: "MARRIED" | "UNMARRIED";
};

export type MedicalReport = {
  id: string;
  reportName: string;
  reportLink: string;
  createdAt: string;
};

export type MeShape = {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string | null;
  contactNumber?: string | null;

  needPasswordCng?: boolean;
  role?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;

  patient?: {
    id: string;
    email: string;
    name: string;
    profilePhoto?: string | null;
    contactNumber?: string | null;
    address?: string | null;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    patientHealthData?: PatientHealthData | null;
    medicalReports?: MedicalReport[];
  };

  address?: string | null;
  isDeleted?: boolean;
};