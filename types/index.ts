export interface Data {
  boards: Board[];
  activeBoardId: string;
  activeTask: Task | null;
  activeColumn: Column | null;
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
  color: string;
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

export const COLOR_MAP: { [key: string]: string } = {
  blue: 'bg-[#38bdf8]',
  purple: 'bg-[#8b5cf6]',
  green: 'bg-[#6ee7b7]',
  yellow: 'bg-[#facc15]',
};
