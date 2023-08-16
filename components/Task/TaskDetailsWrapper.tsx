import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  getActiveBoard,
  getActiveTask,
  resetActiveTask,
  toggleSubtask,
} from '@/redux/slices/boardsSlice';
import {
  closeModal,
  setView,
  isDeleteTaskView,
  isDetailsTaskView,
  isEditTaskView,
  isAddTaskView,
} from '@/redux/slices/modalSlice';
import Modal from '../shared/Modal';
import { EditTask } from './EditTask';
import { DeleteTask } from './DeleteTask';
import { TaskDetailsContent } from './TaskDetailsContent';

export default function TaskDetailsWrapper() {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(getActiveBoard);
  const { columns: activeBoardColumns } = activeBoard;
  const activeTask = useAppSelector(getActiveTask);

  // content inside modal
  const taskEdit = useAppSelector(isEditTaskView);
  const taskAdd = useAppSelector(isAddTaskView);
  const taskDelete = useAppSelector(isDeleteTaskView);
  const taskDetails = useAppSelector(isDetailsTaskView);

  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    dispatch(toggleSubtask({ taskId, subtaskId }));
  };

  const handleCloseModal = () => {
    dispatch(resetActiveTask());
    dispatch(closeModal());
  };
  return (
    <Modal>
      {taskDetails && (
        <TaskDetailsContent
          activeBoardColumns={activeBoardColumns}
          activeTask={activeTask}
          handleToggleSubtask={handleToggleSubtask}
        />
      )}
      {taskEdit && <EditTask />}
      {taskDelete && <DeleteTask />}
      {taskAdd && <div>ADD TASK</div>}
    </Modal>
  );
}
