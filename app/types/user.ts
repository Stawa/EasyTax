interface UserProfile {
  // Firebase Auth
  id: string;
  email: string;
  fullname: string;
  photoURL: string;
  // User Data
  documents: string[]; // /services/documents
  reports: string[]; // /services/status
  history: string[]; // /services/history
  note: string; // /services/calendar
  // Timestamps
  createdAt: Date;
}

export type { UserProfile };
