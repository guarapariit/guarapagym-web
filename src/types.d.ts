export interface InstructorI {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}

export interface StudentI {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  avatar_url: string;
  days: number[];
  instructor_id: string;
  created_at: string;
  updated_at: string;
}