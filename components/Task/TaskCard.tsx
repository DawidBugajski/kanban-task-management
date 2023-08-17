import { Task } from '@/types';
import { useAppSelector } from '@/redux/hooks';
import { isOpenModal } from '@/redux/slices/modalSlice';
import { DraggableTaskCard } from './DraggableTaskCard';
import TaskDetailsWrapper from './TaskDetailsWrapper';

interface TaskCardProps {
  task: Task;
  index: number;
}

export default function TaskCard({ task, index }: TaskCardProps) {
  const isModalOpen = useAppSelector(isOpenModal);

  return (
    <>
      {isModalOpen && <TaskDetailsWrapper />}
      <DraggableTaskCard task={task} index={index} />
    </>
  );
}
