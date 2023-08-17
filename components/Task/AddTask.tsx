import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { getActiveBoard } from '@/redux/slices/boardsSlice';
import Dropdown from '../shared/Dropdown';
import { useTitleAndDescription } from '@/hooks/useTaskTitleAndDescription';

export default function AddTask() {
  //input && textarea
  const { title, description, handleTitleChange, handleDescriptionChange } =
    useTitleAndDescription('enter title', '');

  const activeBoard = useAppSelector(getActiveBoard);

  const { columns: activeBoardColumns } = activeBoard;

  return (
    <div className='relative flex flex-col h-auto gap-6 p-6 md:p-8'>
      <h2 className='text-heading-l font-heading'>Edit Task</h2>
      <input
        className="border border-transparent placeholder:text-red placeholder:text-right outline outline-1 outline-red'
          'border border-opacity-25 border-slate-400 focus-visible:outline focus-visible:outline-purple"
        value={title}
        type='text'
        onChange={(e) => handleTitleChange(e.target.value)}
        // placeholder={validationErrors.title ? "Can't be empty!" : 'Enter title'}
      />
      <textarea
        className='h-auto max-h-[30vh] focus-visible:outline focus-visible:outline-purple dark:bg-transparent pr-6 min-h-[120px] text-[#bfbfc3] text-[13px] font-medium leading-6 w-full py-2 pl-4 border border-opacity-25 rounded border-slate-400'
        value={description}
        onChange={(e) => handleDescriptionChange(e.target.value)}
        placeholder='Your description here...'
      />
      <Dropdown options={activeBoardColumns} changeOnSave={true} />
    </div>
  );
}
