export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
};


export interface User {
  id: string;
  email: string;
  role: 'user' | 'authenticated';
}

export interface ChatMessage{
  timestamp: Date;
  content: string;
  type: 'user' | 'ai';

}
export interface Project {
  id: string;
  title: string;
  owner: string;
  chats: ChatMessage[]
  is_public?: boolean;
  created_at?: Date;
  updated_at?: Date;
  
}

export interface SchemaOutput {
  id: string;
  project_id: string;
  schema_type: string;
  schema_data: string;
  created_at: Date;
  updated_at: Date;
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
