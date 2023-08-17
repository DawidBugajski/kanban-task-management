import { useAppSelector } from '@/redux/hooks';
import {
  isDeleteTaskView,
  isEditTaskView,
  isAddTaskView,
  isDetailsTaskView,
} from '@/redux/slices/modalSlice';

export function useTaskContent() {
  const taskEdit = useAppSelector(isEditTaskView);
  const taskAdd = useAppSelector(isAddTaskView);
  const taskDelete = useAppSelector(isDeleteTaskView);
  const taskDetails = useAppSelector(isDetailsTaskView);

  return { taskEdit, taskAdd, taskDelete, taskDetails };
}
