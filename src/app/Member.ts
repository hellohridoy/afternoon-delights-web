// Member.ts
export interface Member {
  id: number;
  pin: string;
  name: string;
  email: string;
  officialPhoneNumber: string;
  designation: string;
  departments: string;
  unit: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  profilePicture: string; // Assuming profilePicture is a URL to the image
}
