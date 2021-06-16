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

export interface ExerciseI {
  id: string;
  name: string;
  category_id: string;
  category: Category;
  video_url: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Training {
  id: string;
  student_id: string;
  instructor_id: string;
  trainings_sequencies: TrainingsSequency[];
  days: number[];
  category: string;
  created_at: string;
  updated_at: string;
}

export interface DatedTraining extends Training {
  parsedDate?: string;
}

export interface TrainingsSequency {
  id: string;
  sequency: Sequency;
  sequency_id: string;
  training_id: string;
  created_at: string;
  updated_at: string;
}

export interface Sequency {
  id: string;
  exercise_id: string;
  exercise: ExerciseI;
  sets: number;
  repetitions: number;
  created_at: string;
  updated_at: string;
}
