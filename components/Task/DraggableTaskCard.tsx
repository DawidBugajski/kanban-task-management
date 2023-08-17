import { Draggable } from 'react-beautiful-dnd';
import { Task } from '@/types';
import handleSetActiveCard from '@/hooks/useSetActiveTask';

interface DraggableTaskCardProps {
  task: Task;
  index: number;
}

export function DraggableTaskCard({ task, index }: DraggableTaskCardProps) {
  const { subtasks } = task;
  const completedSubtasks = subtasks.filter((subtask) => subtask.isCompleted);
  const handleOpenModal = handleSetActiveCard(task);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          onClick={handleOpenModal}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className={`bg-white dark:bg-dark-grey group cursor-pointer px-4 py-[23px] gap-2 flex flex-col justify-center rounded-lg  ${
              snapshot.isDragging
                ? 'shadow-[0px_4px_6px_0px_rgba(54,_78,_126,_0.10)] transform-none md:skew-y-2 md:scale-95 md:shadow-md md:shadow-purple'
                : 'shadow-[0px_4px_6px_0px_rgba(54,_78,_126,_0.10)]'
            }`}
          >
            <h3 className='transition-colors duration-100 text-heading-m font-heading group-hover:text-purple'>
              {task.title}
            </h3>
            <p className='text-body-m font-heading text-medium-grey'>
              {completedSubtasks.length} of {subtasks.length} subtasks
            </p>
          </div>
        </div>
      )}
    </Draggable>
  );
}
