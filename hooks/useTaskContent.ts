import { useAppSelector } from '@/redux/hooks';
import {
  isDeleteTaskView,
  isEditTaskView,
  isAddTaskView,
  isDetailsTaskView,
  isEditBoardView,
  isDeleteBoardView,
} from '@/redux/slices/modalSlice';

export function useTaskContent() {
  const taskEdit = useAppSelector(isEditTaskView);
  const taskAdd = useAppSelector(isAddTaskView);
  const taskDelete = useAppSelector(isDeleteTaskView);
  const taskDetails = useAppSelector(isDetailsTaskView);
  const boardEdit = useAppSelector(isEditBoardView);
  const boardDelete = useAppSelector(isDeleteBoardView);

  return { taskEdit, taskAdd, taskDelete, taskDetails, boardEdit, boardDelete };
}
