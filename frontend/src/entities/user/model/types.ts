export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  group?: string;
}

export interface UserCreate {
  name: string;
  email: string;
  password: string;
  role: string;
}



export interface UserProgress {
  percent: number;
  completed: number;
  total: number;
}

export interface UpcomingDeadline {
  id: number;
  title: string;
  deadline: string;
}