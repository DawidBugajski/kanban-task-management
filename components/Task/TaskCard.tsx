import { Task } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setActiveTask } from '@/redux/slices/boardsSlice';
import {
  openModal,
  isOpenModal,
  setView,
  ModalContent,
} from '@/redux/slices/modalSlice';
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

  return (
    <>
      {isModalOpen && <TaskDetailsWrapper />}
      <DraggableTaskCard
        task={task}
        index={index}
        handleSetActiveCard={handleSetActiveCard}
      />
    </>
  );
}
