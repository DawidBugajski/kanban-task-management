import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  getActiveBoard,
  getActiveTask,
  toggleSubtask,
} from '@/redux/slices/boardsSlice';
import Modal from './shared/Modal';
import { TaskView } from '@/types';
import { useState } from 'react';
import { TaskDetailsProps } from '@/types/taskTypes';
import { EditTask } from './EditTask';
import { DeleteTask } from './DeleteTask';
import { TaskDetailsContent } from './TaskDetailsContent';

export default function TaskDetails({
  isOpenModal,
  handleCloseModal,
}: TaskDetailsProps) {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(getActiveBoard);
  const activeTask = useAppSelector(getActiveTask);
  const { columns: activeBoardColumns } = activeBoard;
  const [view, setView] = useState(TaskView.Details);

  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    dispatch(toggleSubtask({ taskId, subtaskId }));
  };

  return (
    <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
      {view === TaskView.Details && (
        <TaskDetailsContent
          activeBoardColumns={activeBoardColumns}
          activeTask={activeTask}
          handleToggleSubtask={handleToggleSubtask}
          setView={setView}
        />
      )}
      {view === TaskView.Edit && (
        <EditTask handleCloseModal={handleCloseModal} />
      )}
      {view === TaskView.Delete && <DeleteTask setView={setView} />}
    </Modal>
  );
}
