export interface Chat {
  id: string;
  user: string;
  message: string;
  timestamp: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Upload {
  id: string;
  label: string;
  fileName: string;
  sharedTo: string[];
  file?: File;
}

export interface SharedUpload {
  id: string;
  fileName: string;
  label: string;
  sharedBy: string;
}

export interface Column {
  label: string;
  key: string;
}