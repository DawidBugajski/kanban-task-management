import { useState } from 'react';
import { Task } from '@/types';
import { useAppDispatch } from '@/redux/hooks';
import { setActiveTask, resetActiveTask } from '@/redux/slices/boardsSlice';
import { DraggableTaskCard } from './DraggableTaskCard';
import TaskDetails from './TaskDetails';

interface TaskCardProps {
  task: Task;
  index: number;
  handleSetActiveCard: () => void;
  handleCloseModal: () => void;
}

export default function TaskCard({ task, index }: TaskCardProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useAppDispatch();

  const handleSetActiveCard = () => {
    dispatch(setActiveTask(task));
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    dispatch(resetActiveTask());
  };

  return (
    <>
      {isOpenModal && (
        <TaskDetails
          isOpenModal={isOpenModal}
          handleCloseModal={handleCloseModal}
        />
      )}
      <DraggableTaskCard
        task={task}
        index={index}
        handleSetActiveCard={handleSetActiveCard}
      />
    </>
  );
}
