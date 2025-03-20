export interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
  }


export interface User {
  id: string;
  email: string;
  role: 'user' | 'authenticated';
}


export interface Project {
  id: string;
  name: string;
  
}



// types.ts
export interface AuthState {
  user: any | null; // Replace `any` with your User type if you have one
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
