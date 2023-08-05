import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  getActiveBoard,
  getActiveTask,
  toggleSubtask,
} from '@/redux/slices/boardsSlice';
import { Subtask } from '@/types';
import Modal from './shared/Modal';
import PopoverItem from './shared/Popover';
import Dropdown from './shared/Dropdown';

interface TaskDetailsProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
}

interface SubtaskListProps {
  subtasks: Subtask[];
  handleToggleSubtask: (taskId: string, subtaskId: string) => void;
  activeTaskId: string;
}

export default function TaskDetails({
  isOpenModal,
  handleCloseModal,
}: TaskDetailsProps) {
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
        {title && (
          <div className='flex items-center mb-6 md:justify-between'>
            <p className='w-11/12 md:w-10/12 text-heading-l font-heading'>
              {title}
            </p>
            <PopoverItem />
          </div>
        )}
        {description && (
          <p className='mb-6 text-body-l text-medium-grey font-body-l'>
            {description}
          </p>
        )}
        <p className='mb-4 text-body-m font-body-m text-medium-grey'>
          Subtasks: ({completedSubtasks} of {totalSubtasks})
        </p>
        <SubtaskList
          subtasks={subtasks}
          handleToggleSubtask={handleToggleSubtask}
          activeTaskId={activeTask?.id || ''}
        />
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
function SubtaskList({
  subtasks,
  handleToggleSubtask,
  activeTaskId,
}: SubtaskListProps) {
  return (
    <div className='flex flex-col gap-2'>
      {subtasks.map((task) => (
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
              onChange={() => handleToggleSubtask(activeTaskId, task.id)}
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
  );
}
