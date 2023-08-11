import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  getActiveBoard,
  getActiveTask,
  toggleSubtask,
} from '@/redux/slices/boardsSlice';
import {
  closeModal,
  currentModalContent,
  setView,
  isOpenModal,
  isDeleteTaskView,
  isDetailsTaskView,
  isEditTaskView,
  isAddTaskView,
} from '@/redux/slices/modalSlice'; //
import Modal from '../shared/Modal';
import { EditTask } from './EditTask';
import { DeleteTask } from './DeleteTask';
import { TaskDetailsContent } from './TaskDetailsContent';

export default function TaskDetailsWrapper() {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(getActiveBoard);
  const { columns: activeBoardColumns } = activeBoard;
  const activeTask = useAppSelector(getActiveTask);
  const isOpen = useAppSelector(isOpenModal);
  // content inside modal
  const taskEdit = useAppSelector(isEditTaskView);
  const taskAdd = useAppSelector(isAddTaskView);
  const taskDelete = useAppSelector(isDeleteTaskView);
  const taskDetails = useAppSelector(isDetailsTaskView);
  const currentTaskContent = useAppSelector(currentModalContent);
  console.log(currentTaskContent);
  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    dispatch(toggleSubtask({ taskId, subtaskId }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      {taskDetails && (
        <TaskDetailsContent
          activeBoardColumns={activeBoardColumns}
          activeTask={activeTask}
          handleToggleSubtask={handleToggleSubtask}
          setView={(content) => dispatch(setView(content))}
        />
      )}
      {taskEdit && <EditTask handleCloseModal={handleCloseModal} />}
      {taskDelete && (
        <DeleteTask setView={(content) => dispatch(setView(content))} />
      )}
      {taskAdd && <div>ADD TASK</div>}
    </Modal>
  );
}
