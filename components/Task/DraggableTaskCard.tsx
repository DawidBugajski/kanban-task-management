import { Draggable } from 'react-beautiful-dnd';
import { Task } from '@/types';
import { setActiveTask } from '@/redux/slices/boardsSlice';
import { openModal } from '@/redux/slices/modalSlice';
import { useAppDispatch } from '@/redux/hooks';

interface DraggableTaskCardProps {
  task: Task;
  index: number;
  handleSetActiveCard?: () => void;
  openModal?: () => void;
}

export function DraggableTaskCard({ task, index }: DraggableTaskCardProps) {
  const dispatch = useAppDispatch();
  const { subtasks } = task;
  const completedSubtasks = subtasks.filter((subtask) => subtask.isCompleted);

  const handleSetActiveCard = () => {
    dispatch(setActiveTask(task));
    dispatch(openModal(task));
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          onClick={handleSetActiveCard}
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
