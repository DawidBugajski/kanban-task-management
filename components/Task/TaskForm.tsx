import { ICON_CROSS_SVG } from '@/constans';
import Button from '../shared/Button';
import { v4 as uuidv4 } from 'uuid';
import Dropdown from '../shared/Dropdown';
import Image from 'next/image';
import { useValidationErrors } from '@/hooks/useTaskValidationErrors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addSubtask,
  addTask,
  deleteSubtask,
  getActiveBoard,
  getActiveTask,
  moveTaskToColumn,
  updateSubtaskTitles,
  updateTaskDescription,
  updateTaskTitle,
} from '@/redux/slices/boardsSlice';
import { useTitleAndDescription } from '@/hooks/useTaskTitleAndDescription';
import { useTaskSubtasks } from '@/hooks/useTaskSubtasks';
import { useSelectedColumn } from '@/hooks/useTaskSelectedColumn';
import { useCloseModal } from '@/hooks/useCloseModal';

type ContextType = 'Edit Task' | 'Add Task';

interface FormProps {
  context: ContextType;
}

export const TaskForm = ({ context }: FormProps) => {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(getActiveBoard);
  const activeTask = useAppSelector(getActiveTask);
  const { columns: activeBoardColumns } = activeBoard;
  const { subtasks = [] } = activeTask || {};
  const currentColumnForTask = activeBoard.columns.find((column) =>
    column.tasks.some((task) => task.id === activeTask?.id)
  );

  const { title, description, handleTitleChange, handleDescriptionChange } =
    useTitleAndDescription(
      activeTask?.title || '',
      activeTask?.description || ''
    );

  const {
    localSubtasks,
    handleAddSubtask,
    handleDeleteSubtask,
    handleSubtaskTitleChange,
    lastInputRef,
  } = useTaskSubtasks(subtasks);

  const { selectedColumn, handleColumnChange } = useSelectedColumn(
    currentColumnForTask?.id || activeBoardColumns[0]?.id || null
  );

  const { validationErrors, validateChanges } = useValidationErrors({
    title: false,
    subtasks: Array(subtasks.length).fill(false),
  });

  const handleCloseModal = useCloseModal();

  const handleSaveChanges = () => {
    if (!validateChanges(title, localSubtasks)) return;

    if (activeTask && selectedColumn) {
      dispatch(
        moveTaskToColumn({ taskId: activeTask.id, newColumnId: selectedColumn })
      );
      dispatch(updateTaskTitle({ taskId: activeTask.id, title }));
      dispatch(
        updateTaskDescription({
          taskId: activeTask.id,
          description: description,
        })
      );

      subtasks.forEach((subtask) => {
        if (!localSubtasks.some((task) => task.id === subtask.id)) {
          dispatch(deleteSubtask({ subtaskId: subtask.id }));
        }
      });

      localSubtasks.forEach((localSubtask) => {
        if (!subtasks.some((subtask) => subtask.id === localSubtask.id)) {
          dispatch(
            addSubtask({ taskId: activeTask.id, subtask: localSubtask })
          );
        }
      });

      dispatch(
        updateSubtaskTitles({ taskId: activeTask.id, subtasks: localSubtasks })
      );
    }
    handleCloseModal();
  };

  const handleAddNewTask = () => {
    if (!validateChanges(title, localSubtasks)) return;

    if (selectedColumn === null) return;

    const newTask = {
      id: uuidv4(),
      title,
      description,
      status: selectedColumn,
      subtasks: localSubtasks,
    };

    dispatch(addTask({ columnId: selectedColumn, task: newTask }));
    handleCloseModal();
  };

  const handleButtonClick = () => {
    const actions = {
      'Edit Task': handleSaveChanges,
      'Add Task': handleAddNewTask,
    };

    const action = actions[context];
    if (action) {
      action();
    }
  };

  return (
    <div className='relative flex flex-col h-auto gap-6 p-6 overflow-hidden md:p-8'>
      <h2 className='text-heading-l font-heading'>
        {context === 'Edit Task' ? 'Edit Task' : 'Add Task'}
      </h2>
      <div className='flex flex-col gap-2'>
        <p className='text-body-m text-medium-grey font-body-m'>Title</p>
        <input
          className={`${
            validationErrors.title
              ? 'placeholder:text-red placeholder:text-right outline outline-1 outline-red focus-visible:outline-purple border border-transparent'
              : 'border border-opacity-25 border-slate-400 focus-visible:outline focus-visible:outline-purple'
          } dark:bg-transparent text-[13px] font-medium leading-6 w-full py-2 px-4 rounded `}
          value={title}
          type='text'
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder={
            validationErrors.title ? "Can't be empty!" : 'Enter title'
          }
        />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-body-m text-medium-grey font-body-m'>Description</p>
        <textarea
          className='h-auto max-h-[30vh] focus-visible:outline focus-visible:outline-purple dark:bg-transparent pr-6 min-h-[120px] text-[#bfbfc3] text-[13px] font-medium leading-6 w-full py-2 pl-4 border border-opacity-25 rounded border-slate-400'
          value={description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          placeholder='Your description here...'
        />
      </div>
      <div className='flex flex-col justify-between w-full gap-3 max-h-[25vh] overflow-y-auto py-0.5'>
        {localSubtasks.map((task, index) => (
          <div className='flex' key={task.id}>
            <input
              ref={index === localSubtasks.length - 1 ? lastInputRef : null}
              className={`${
                validationErrors.subtasks[index]
                  ? 'border-red border-opacity-100 placeholder:text-red placeholder:text-right'
                  : 'border-slate-400 focus-visible:outline-none border-opacity-25'
              }  dark:bg-transparent text-[13px] font-medium leading-6 py-2 px-4 border outline-none rounded w-11/12 focus-visible:border-purple `}
              value={task.title}
              type='text'
              onChange={(e) => handleSubtaskTitleChange(index, e.target.value)}
              placeholder={
                validationErrors.subtasks[index]
                  ? "Can't be empty!"
                  : 'New subtask'
              }
            />
            <Button
              onClick={() => handleDeleteSubtask(task.id)}
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
        onClick={handleAddSubtask}
        className='transition-colors duration-100 hover:bg-[#d8d7f1] text-body-l font-bold bg-[#f0effa] py-2 text-center text-purple rounded-[20px] grow'
      >
        +Add New Subtask
      </Button>
      <Dropdown
        options={activeBoardColumns}
        changeOnSave={true}
        onValueChange={handleColumnChange}
      />
      <Button
        onClick={handleButtonClick}
        className='transition-colors duration-100 hover:bg-purple-hover text-body-l font-bold bg-purple py-2 text-center text-white rounded-[20px] grow'
      >
        {context === 'Edit Task' ? 'Save Changes' : 'Create Task'}
      </Button>
    </div>
  );
};
