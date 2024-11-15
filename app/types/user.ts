interface Reports {
  currentStatus: "completed" | "on_progress" | "not_started" | "none";
  informations: {
    date: Date | null;
    name: string;
    npwp: string;
    number: string;
    period: Date | null;
    type: string;
  };
}

interface UserProfile {
  // Firebase Auth
  id: string;
  email: string;
  fullname: string;
  photoURL: string;
  // User Data
  documents: string[]; // /services/documents
  reports: Reports; // /services/status
  history: string[]; // /services/history
  note: string; // /services/calendar
  // Timestamps
  createdAt: Date;
}

export type { UserProfile };
