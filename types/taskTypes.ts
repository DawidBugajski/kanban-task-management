import { Column, Subtask, Task, TaskView } from '.';

export interface TaskDetailsProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
}

export interface TaskDetailsViewProps {
  activeBoardColumns: Column[];
  activeTask: Task | null;
  handleToggleSubtask: (taskId: string, subtaskId: string) => void;
  setView: React.Dispatch<React.SetStateAction<TaskView>>;
}

export interface SubtaskListProps {
  subtasks: Subtask[];
  handleToggleSubtask: (taskId: string, subtaskId: string) => void;
  activeTaskId: string;
}

export interface DeleteTaskProps {
  setView: React.Dispatch<React.SetStateAction<TaskView>>;
}
