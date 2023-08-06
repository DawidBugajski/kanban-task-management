import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  deleteTask,
  getActiveBoard,
  getActiveTask,
  toggleSubtask,
} from '@/redux/slices/boardsSlice';
import Modal from './shared/Modal';
import PopoverItem from './shared/Popover';
import Dropdown from './shared/Dropdown';
import { TaskView } from '@/types';
import { useState } from 'react';
import Button from './shared/Button';
import {
  TaskDetailsProps,
  DeleteTaskProps,
  SubtaskListProps,
  TaskDetailsViewProps,
} from '@/types/taskTypes';
import { ICON_CROSS_SVG } from '@/constans';
import Image from 'next/image';

export default function TaskDetails({
  isOpenModal,
  handleCloseModal,
}: TaskDetailsProps) {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(getActiveBoard);
  const activeTask = useAppSelector(getActiveTask);
  const { columns: activeBoardColumns } = activeBoard;
  const [view, setView] = useState(TaskView.Details);

  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    dispatch(toggleSubtask({ taskId, subtaskId }));
  };

  return (
    <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
      {view === TaskView.Details && (
        <TaskDetailsView
          activeBoardColumns={activeBoardColumns}
          activeTask={activeTask}
          handleToggleSubtask={handleToggleSubtask}
          setView={setView}
        />
      )}
      {view === TaskView.Edit && <EditTask />}
      {view === TaskView.Delete && <DeleteTask setView={setView} />}
    </Modal>
  );
}

function TaskDetailsView({
  activeBoardColumns,
  activeTask,
  handleToggleSubtask,
  setView,
}: TaskDetailsViewProps) {
  const { title, description, subtasks = [] } = activeTask || {};
  const totalSubtasks = subtasks.length;
  const completedSubtasks = subtasks.filter((task) => task.isCompleted).length;

  return (
    <div className='relative flex flex-col h-auto p-6 md:p-8'>
      {title && (
        <div className='flex items-center mb-6 md:justify-between'>
          <p className='w-11/12 text-heading-l font-heading'>{title}</p>
          <PopoverItem setView={setView} />
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
  );
}

function SubtaskList({
  subtasks,
  handleToggleSubtask,
  activeTaskId,
}: SubtaskListProps) {
  return (
    <div className='flex flex-col gap-2 max-h-[35vh] overflow-y-auto'>
      {subtasks.map((task) => (
        <div
          className='flex flex-col p-3 transition-colors duration-150 rounded group dark:hover:bg-purple-inputs hover:bg-purple-inputs min-h-auto bg-lightbg-light-grey text-body-m font-body-m dark:bg-darkbg-very-dark-grey'
          key={task.id}
        >
          <div className='flex items-center gap-4'>
            <div
              className={`shrink-0 relative h-4 w-4 border ${
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
                <span className='absolute flex items-center justify-center w-full h-full text-white rounded-sm cursor-pointer pointer-events-none'>
                  ✓
                </span>
              )}
            </div>
            <p
              className={`text-body-m font-body-m ${
                task.isCompleted
                  ? 'line-through text-medium-grey group-hover:text-black'
                  : 'text-black dark:text-white group-hover:text-black'
              } overflow-wrap: break-word; word-break: break-word;`}
            >
              {task.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function EditTask() {
  const activeBoard = useAppSelector(getActiveBoard);
  const activeTask = useAppSelector(getActiveTask);
  const { columns: activeBoardColumns } = activeBoard;
  const { subtasks = [] } = activeTask || {};

  return (
    <div className='relative flex flex-col h-auto gap-6 p-6 md:p-8'>
      <h2 className='text-heading-l font-heading'>Edit Task</h2>
      <div className='flex flex-col gap-2'>
        <p className='text-body-m text-medium-grey font-body-m'>Title</p>
        <input
          className='dark:bg-transparent text-[13px] font-medium leading-6 w-full py-2 px-4 border border-opacity-25 rounded border-slate-400'
          value={activeTask?.title || 'enter title'}
          type='text'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-body-m text-medium-grey font-body-m'>Description</p>
        <textarea
          className='dark:bg-transparent pr-6 min-h-[120px] text-[#bfbfc3] text-[13px] font-medium leading-6 w-full py-2 pl-4 border border-opacity-25 rounded border-slate-400'
          value={activeTask?.description || 'Your description here...'}
        />
      </div>
      <div className='flex flex-col justify-between w-full gap-3 max-h-[25vh] overflow-y-auto'>
        {subtasks.map((task) => (
          <div className='flex ' key={task.id}>
            <input
              className='dark:bg-transparent text-[13px] font-medium leading-6 py-2 px-4 border border-opacity-25 rounded border-slate-400 w-11/12'
              value={task.title}
              type='text'
            />
            <Button
              onClick={() => console.log('k')}
              className='mx-auto shrink-0'
            >
              <Image
                src={ICON_CROSS_SVG}
                alt='icon cross'
                width={15}
                height={15}
              />
            </Button>
          </div>
        ))}
      </div>
      <Button
        onClick={() => console.log('first')}
        className='transition-colors duration-100 hover:bg-[#d8d7f1] text-body-l font-bold bg-[#f0effa] py-2 text-center text-purple rounded-[20px] grow'
      >
        +Add New Subtask
      </Button>
      <Dropdown options={activeBoardColumns} />
      <Button
        onClick={() => console.log('first')}
        className='transition-colors duration-100 hover:bg-purple-hover text-body-l font-bold bg-purple py-2 text-center text-white rounded-[20px] grow'
      >
        Save Changes
      </Button>
    </div>
  );
}

function DeleteTask({ setView }: DeleteTaskProps) {
  const dispatch = useAppDispatch();
  const activeTask = useAppSelector(getActiveTask);
  const handleDeleteTask = () => {
    if (activeTask) {
      dispatch(deleteTask({ taskId: activeTask?.id }));
    }
  };

  return (
    <div className='relative flex flex-col h-auto gap-6 p-6 md:p-8'>
      <h2 className='text-red heading-l font-heading'>Delete this task?</h2>
      <p className='font-body-l text-body-l text-medium-grey'>
        Are you sure you want to delete the ‘{activeTask?.title}’ task and its
        subtasks? This action cannot be reversed.
      </p>
      <div className='flex gap-4'>
        <Button
          onClick={handleDeleteTask}
          className='transition-colors duration-100 hover:bg-red-hover text-body-l font-bold py-2 text-center text-white rounded-[20px] bg-red grow'
        >
          Delete
        </Button>
        <Button
          onClick={() => setView(TaskView.Details)}
          className='transition-colors duration-100 hover:bg-[#d8d7f1] text-body-l font-bold bg-[#f0effa] py-2 text-center text-purple rounded-[20px] grow'
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
