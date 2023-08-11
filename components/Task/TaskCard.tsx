import { Task } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setActiveTask, resetActiveTask } from '@/redux/slices/boardsSlice';
import { openModal, closeModal, isOpenModal } from '@/redux/slices/modalSlice';
import { DraggableTaskCard } from './DraggableTaskCard';
import TaskDetailsWrapper from './TaskDetailsWrapper';

interface TaskCardProps {
  task: Task;
  index: number;
}

export default function TaskCard({ task, index }: TaskCardProps) {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(isOpenModal);

  const handleSetActiveCard = () => {
    dispatch(setActiveTask(task));
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(resetActiveTask());
    dispatch(closeModal());
  };

  return (
    <>
      {isModalOpen && (
        <TaskDetailsWrapper handleCloseModal={handleCloseModal} />
      )}
      <DraggableTaskCard
        task={task}
        index={index}
        handleSetActiveCard={handleSetActiveCard}
      />
    </>
  );
}
