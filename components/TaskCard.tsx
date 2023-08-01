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
  return (
    <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
      <div className='flex flex-col justify-center h-full'>
        <p>{activeTask?.title}</p>
        <p>{activeTask?.description}</p>
        <p>{activeTask?.status}</p>
        {activeTask?.subtasks.map((task) => (
          <div key={task.id}>
            <p
              className={`${task.isCompleted ? 'text-green-400' : 'text-red'}`}
            >
              {task.title}
            </p>
          </div>
        ))}
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
