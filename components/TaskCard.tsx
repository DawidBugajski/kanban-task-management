import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  setActiveTask,
  getActiveTask,
  resetActiveTask,
} from '@/redux/slices/boardsSlice';
import Modal from './shared/Modal';
import { EditStateButton } from './shared/EditStateButton';

interface TaskCardProps {
  task: Task;
  index: number;
  handleSetActiveCard: () => void;
}

interface TaskDetailsProps {
  isOpenModal: boolean;
  activeTask: Task | null;
  handleCloseModal: () => void;
}

export default function TaskCard({ task, index }: TaskCardProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const activeTask = useAppSelector(getActiveTask);

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
          activeTask={activeTask}
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

function TaskDetails({
  isOpenModal,
  activeTask,
  handleCloseModal,
}: TaskDetailsProps) {
  const { title, description, subtasks = [] } = activeTask || {};
  const totalSubtasks = subtasks.length;
  const completedSubtasks = subtasks.filter((task) => task.isCompleted).length;

  return (
    <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
      <div className='relative flex flex-col h-full p-6'>
        <EditStateButton
          className='absolute top-0 left-0'
          onClick={() => console.log('edit task')}
        />
        {title && <p className='mb-6 text-heading-l font-heading'>{title}</p>}
        {description && (
          <p className='mb-6 text-body-l text-medium-grey font-body-l'>
            {description}
          </p>
        )}
        <p className='mb-4 text-body-m font-body-m text-medium-grey'>
          Subtasks: ({completedSubtasks} of {totalSubtasks})
        </p>
        <div className='flex flex-col gap-2 overflow-y-auto max-h-[50vh]'>
          {subtasks.map((task) => (
            <div
              className='flex items-center gap-4 p-2 rounded bg-lightbg-light-grey dark:bg-dark-grey text-body-m font-body-m'
              key={task.id}
            >
              <input
                type='checkbox'
                checked={task.isCompleted}
                className={`${
                  task.isCompleted
                    ? 'line-through text-medium-grey'
                    : 'text-black'
                } h-10 `}
              />
              <p
                className={`${
                  task.isCompleted
                    ? 'line-through text-medium-grey'
                    : 'text-black'
                }`}
              >
                {task.title}
              </p>
            </div>
          ))}
        </div>
        <div className='mt-4'>
          <p className='text-body-m font-body-m text-medium-grey'>
            current status
          </p>
          <p className='p-1 border-[1px] rounded border-medium-grey'>MENU</p>
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
            <p className='text-body-m font-heading text-medium-grey '>
              {completedSubtasks.length} of {subtasks.length} subtasks
            </p>
          </div>
        </div>
      )}
    </Draggable>
  );
}
