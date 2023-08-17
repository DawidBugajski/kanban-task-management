export interface Data {
  boards: Board[];
  activeBoardId: string;
  activeTask: Task | null;
}

export interface Board {
  name: string;
  id: string;
  columns: Column[];
}

export interface Column {
  name: string;
  id: string;
  tasks: Task[];
}

export interface Task {
  title: string;
  description: string;
  status: string;
  id: string;
  subtasks: Subtask[];
}

export interface Subtask {
  title: string;
  id: string;
  isCompleted: boolean;
}

export enum TaskView {
  DETAILS = 'details',
  EDIT = 'edit',
  DELETE = 'delete',
  ADD = 'add',
}
