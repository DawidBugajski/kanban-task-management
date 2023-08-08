import { useState } from 'react';
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
import { v4 as uuidv4 } from 'uuid';
import Button from '../shared/Button';
import Image from 'next/image';
import { ICON_CROSS_SVG } from '@/constans';
import Dropdown from '../shared/Dropdown';
import { Subtask } from '@/types';

export function EditTask({ handleCloseModal }: EditTaskProps) {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(getActiveBoard);
  const activeTask = useAppSelector(getActiveTask);
  const { columns: activeBoardColumns } = activeBoard;
  const { subtasks = [] } = activeTask || {};

  const currentColumnForTask = activeBoard.columns.find((column) =>
    column.tasks.some((task) => task.id === activeTask?.id)
  );

  const initialState = {
    selectedColumn: currentColumnForTask?.id || null,
    localSubtasks: subtasks,
    title: activeTask?.title || 'enter title',
    description: activeTask?.description || 'Your description here...',
    subtaskTitles: subtasks.map((subtask) => subtask.title),
  };

  // LocalState to keep changes that will pass to redux after save only
  const [state, setState] = useState(initialState);

  const handleTitleChange = (newTitle: string) => {
    setState({ ...state, title: newTitle });
  };

  const handleDescriptionChange = (newDescription: string) => {
    setState({ ...state, description: newDescription });
  };

  const handleColumnChange = (newColumnId: string) => {
    setState({ ...state, selectedColumn: newColumnId });
  };

  const handleDeleteSubtask = (subtaskId: string) => {
    const updatedSubtasks = state.localSubtasks.filter(
      (task) => task.id !== subtaskId
    );
    const updatedSubtaskTitles = updatedSubtasks.map(
      (subtask) => subtask.title
    );
    setState({
      ...state,
      localSubtasks: updatedSubtasks,
      subtaskTitles: updatedSubtaskTitles,
    });
  };

  const handleSubtaskTitleChange = (index: number, newTitle: string) => {
    const updatedSubtaskTitles = [...state.subtaskTitles];
    updatedSubtaskTitles[index] = newTitle;
    setState({ ...state, subtaskTitles: updatedSubtaskTitles });
  };

  const handleAddSubtask = () => {
    const newSubtask: Subtask = {
      id: uuidv4(),
      title: 'New subtask',
      isCompleted: false,
    };
    // Update local sub-tasks and sub-task titles
    const updatedLocalSubtasks = [...state.localSubtasks, newSubtask];
    const updatedSubtaskTitles = [...state.subtaskTitles, newSubtask.title];

    setState({
      ...state,
      localSubtasks: updatedLocalSubtasks,
      subtaskTitles: updatedSubtaskTitles,
    });
  };

  const handleSaveChanges = () => {
    if (activeTask && state.selectedColumn) {
      // change column for task
      dispatch(
        moveTaskToColumn({
          taskId: activeTask.id,
          newColumnId: state.selectedColumn,
        })
      );

      // Update title and description in Redux
      dispatch(updateTaskTitle({ taskId: activeTask.id, title: state.title }));
      dispatch(
        updateTaskDescription({
          taskId: activeTask.id,
          description: state.description,
        })
      );

      // delete subtask
      subtasks.forEach((subtask) => {
        if (!state.localSubtasks.some((task) => task.id === subtask.id)) {
          dispatch(deleteSubtask({ subtaskId: subtask.id }));
        }
      });

      // add subtask
      state.localSubtasks.forEach((localSubtask) => {
        if (!subtasks.some((subtask) => subtask.id === localSubtask.id)) {
          dispatch(
            addSubtask({ taskId: activeTask.id, subtask: localSubtask })
          );
        }
      });

      // re-name subtask
      dispatch(
        updateSubtaskTitles({
          taskId: activeTask.id,
          subtasks: state.localSubtasks.map((subtask, index) => ({
            ...subtask,
            title: state.subtaskTitles[index],
          })),
        })
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
          className='dark:bg-transparent text-[13px] font-medium leading-6 w-full py-2 px-4 border border-opacity-25 rounded border-slate-400'
          value={state.title}
          type='text'
          onChange={(e) => handleTitleChange(e.target.value)}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-body-m text-medium-grey font-body-m'>Description</p>
        <textarea
          onClick={(e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) =>
            e.currentTarget.select()
          }
          className='dark:bg-transparent pr-6 min-h-[120px] text-[#bfbfc3] text-[13px] font-medium leading-6 w-full py-2 pl-4 border border-opacity-25 rounded border-slate-400'
          value={state.description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
        />
      </div>
      <div className='flex flex-col justify-between w-full gap-3 max-h-[25vh] overflow-y-auto'>
        {state.localSubtasks.map((task, index) => (
          <div className='flex ' key={task.id}>
            <input
              className='dark:bg-transparent text-[13px] font-medium leading-6 py-2 px-4 border border-opacity-25 rounded border-slate-400 w-11/12'
              value={state.subtaskTitles[index]}
              type='text'
              onChange={(e) => handleSubtaskTitleChange(index, e.target.value)}
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
