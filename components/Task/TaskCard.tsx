import { Task } from '@/types';
import { DraggableTaskCard } from './DraggableTaskCard';
import handleSetActiveCard from '@/hooks/useSetActiveTask';

interface TaskCardProps {
  task: Task;
  index: number;
}

export default function TaskCard({ task, index }: TaskCardProps) {
  const handleOpenModal = handleSetActiveCard(task);

  return (
    <div onClick={handleOpenModal}>
      <DraggableTaskCard task={task} index={index} />
    </div>
  );
}
