import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  setActiveTask,
  getActiveTask,
  resetActiveTask,
  getActiveBoard,
  toggleSubtask,
  moveTaskToColumn,
} from '@/redux/slices/boardsSlice';
import Modal from './shared/Modal';
import { EditStateButton } from './shared/EditStateButton';
import Dropdown from './shared/Dropdown';

interface TaskCardProps {
  task: Task;
  index: number;
  handleSetActiveCard?: () => void;
}

interface TaskDetailsProps {
  isOpenModal: boolean;
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

function TaskDetails({ isOpenModal, handleCloseModal }: TaskDetailsProps) {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(getActiveBoard);
  const activeTask = useAppSelector(getActiveTask);
  const { columns: activeBoardColumns } = activeBoard;
  const { title, description, subtasks = [] } = activeTask || {};
  const totalSubtasks = subtasks.length;
  const completedSubtasks = subtasks.filter((task) => task.isCompleted).length;

  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    dispatch(toggleSubtask({ taskId, subtaskId }));
  };

  return (
    <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
      <div className='relative flex flex-col h-auto max-h-[75vh] p-6 overflow-y-auto'>
        <EditStateButton
          className='absolute top-[0.75rem] left-2 focus-visible:outline-none'
          onClick={() => console.log('edit task')}
        />
        {title && (
          <p className='w-11/12 mb-6 text-heading-l font-heading'>{title}</p>
        )}
        {description && (
          <p className='mb-6 text-body-l text-medium-grey font-body-l'>
            {description}
          </p>
        )}
        <p className='mb-4 text-body-m font-body-m text-medium-grey'>
          Subtasks: ({completedSubtasks} of {totalSubtasks})
        </p>
        <div className='flex flex-col gap-2'>
          {activeTask &&
            subtasks.map((task) => (
              <div
                className='transition-colors duration-150 group dark:hover:bg-purple-inputs hover:bg-purple-inputs flex items-center min-h-[40px] gap-4 p-4 rounded bg-lightbg-light-grey text-body-m font-body-m dark:bg-darkbg-very-dark-grey'
                key={task.id}
              >
                <div
                  className={`relative h-4 w-4 border shrink-0 ${
                    task.isCompleted
                      ? 'bg-purple border-purple'
                      : 'bg-white border-bg-lightbg-light-grey'
                  } rounded-sm`}
                >
                  <input
                    type='checkbox'
                    onChange={() => handleToggleSubtask(activeTask.id, task.id)}
                    checked={task.isCompleted}
                    className='absolute top-0 left-0 w-full h-full rounded-sm appearance-none cursor-pointer'
                  />
                  {task.isCompleted && (
                    <span className='absolute flex items-center justify-center w-full h-full text-white rounded-sm cursor-pointer pointer-events-none shrink-0'>
                      ✓
                    </span>
                  )}
                </div>
                <p
                  className={`text-body-m font-body-m ${
                    task.isCompleted
                      ? 'line-through text-medium-grey group-hover:text-black'
                      : 'text-black dark:text-white group-hover:text-black'
                  }`}
                >
                  {task.title}
                </p>
              </div>
            ))}
        </div>
        <div className='mt-4'>
          <p className='mb-2 text-body-m font-body-m text-medium-grey dark:text-white'>
            Current status
          </p>
          <Dropdown options={activeBoardColumns} />
        </div>
      </div>
    </Modal>
  );
}

function DraggableTaskCard({
  task,
  index,
  handleSetActiveCard,
}: TaskCardProps) {
  const { subtasks } = task;
  const completedSubtasks = subtasks.filter((subtask) => subtask.isCompleted);

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
