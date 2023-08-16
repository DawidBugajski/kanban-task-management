import { Subtask } from '.';

export interface SubtaskListProps {
  subtasks: Subtask[];
  handleToggleSubtask: (taskId: string, subtaskId: string) => void;
  activeTaskId: string;
}
