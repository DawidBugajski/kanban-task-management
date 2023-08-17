import { Task } from '@/types';
import { useAppDispatch } from '@/redux/hooks';
import { openModal } from '@/redux/slices/modalSlice';
import { DraggableTaskCard } from './DraggableTaskCard';
import TaskDetailsWrapper from './TaskDetailsWrapper';

interface TaskCardProps {
  task: Task;
  index: number;
}

export default function TaskCard({ task, index }: TaskCardProps) {
  const dispatch = useAppDispatch();
  const handleOpenModal = () => dispatch(openModal(task));

  return (
    <div onClick={handleOpenModal}>
      <DraggableTaskCard task={task} index={index} />
    </div>
  );
}
