export type TaskType = 'lab' | 'homework';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  type: string;
  deadline: string | null;
  channel_id: number;
  created_at: string;
}

export interface TaskCreate {
  title: string;
  description?: string;
  type: string;
  deadline?: string | null;
  channel_id: number;
}