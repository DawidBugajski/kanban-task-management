import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addSubtask,
  deleteSubtask,
  getActiveBoard,
  getActiveTask,
  moveTaskToColumn,
  updateSubtaskTitles,
  updateTaskDescription,
  updateTaskTitle,
} from '@/redux/slices/boardsSlice';
import { EditTaskProps } from '@/types/taskTypes';
import Button from '../shared/Button';
import Image from 'next/image';
import { ICON_CROSS_SVG } from '@/constans';
import Dropdown from '../shared/Dropdown';
import { useTitleAndDescription } from '@/hooks/useTaskTitleAndDescription';
import { useSubtasks } from '@/hooks/useSubtasks';

export function EditTask({ handleCloseModal }: EditTaskProps) {
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
      activeTask?.title || 'enter title',
      activeTask?.description || ''
    );

  const {
    localSubtasks,
    handleAddSubtask,
    handleDeleteSubtask,
    handleSubtaskTitleChange,
  } = useSubtasks(subtasks);

  const [selectedColumn, setSelectedColumn] = useState(
    currentColumnForTask?.id || null
  );
  const [validationErrors, setValidationErrors] = useState({
    title: false,
    subtasks: Array(subtasks.length).fill(false),
  });

  const handleColumnChange = (newColumnId: string) =>
    setSelectedColumn(newColumnId);

  const lastInputRef = useRef<HTMLInputElement>(null);

  const handleSaveChanges = () => {
    const errors = {
      title: title.trim() === '',
      subtasks: localSubtasks.map((subtask) => subtask.title.trim() === ''),
    };

    if (errors.title || errors.subtasks.some((error) => error)) {
      setValidationErrors(errors);
      return;
    }
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

  return (
    <div className='relative flex flex-col h-auto gap-6 p-6 md:p-8'>
      <h2 className='text-heading-l font-heading'>Edit Task</h2>
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
                  ? 'border-red border-opacity-100'
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
        onClick={handleSaveChanges}
        className='transition-colors duration-100 hover:bg-purple-hover text-body-l font-bold bg-purple py-2 text-center text-white rounded-[20px] grow'
      >
        Save Changes
      </Button>
    </div>
  );
}
