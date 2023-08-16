import { Column, Subtask, Task } from '.';

export interface TaskDetailsProps {
  handleCloseModal: () => void;
}

export interface TaskDetailsViewProps {
  activeBoardColumns: Column[];
  activeTask: Task | null;
  handleToggleSubtask: (taskId: string, subtaskId: string) => void;
}

export interface SubtaskListProps {
  subtasks: Subtask[];
  handleToggleSubtask: (taskId: string, subtaskId: string) => void;
  activeTaskId: string;
}
