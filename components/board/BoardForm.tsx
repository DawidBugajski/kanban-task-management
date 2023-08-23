import React from 'react';
import Button from '../shared/Button';
import { ICON_CROSS_SVG } from '@/constans';
import Image from 'next/image';
import Dropdown from '../shared/Dropdown';
import { useBoardValidationErrors } from '@/hooks/useBoardValidationErrors';
import { useAppSelector } from '@/redux/hooks';
import { getActiveBoard } from '@/redux/slices/boardsSlice';
import { useBoardTitle } from '@/hooks/useBoardTitle';

type ContextType = 'Edit Board' | 'Add Board';

interface BoardForm {
  context: ContextType;
}

export default function BoardForm({ context }: BoardForm) {
  const activeBoard = useAppSelector(getActiveBoard);
  const { columns } = activeBoard;
  const { validationErrors, validateChanges } = useBoardValidationErrors({
    title: false,
    columns: Array(columns.length).fill(false),
  });
  const { title, handleTitleChange } = useBoardTitle(activeBoard?.name || '');

  return (
    <div className='relative flex flex-col h-auto gap-6 p-6 md:p-8'>
      <h2 className='text-heading-l font-heading'>
        {context === 'Edit Board' ? 'Edit Board' : 'Add board'}
      </h2>
      <div className='flex flex-col gap-2'>
        <p className='text-body-m text-medium-grey font-body-m'>Board name</p>
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
            validationErrors.title ? "Can't be empty!" : 'Enter name'
          }
        />
      </div>
      {/* <div className='flex flex-col justify-between w-full gap-3 max-h-[25vh] overflow-y-auto py-0.5'>
        {localColumns.map((column, index) => (
          <div className='flex' key={task.id}>
            <input
              ref={index === localColumns.length - 1 ? lastInputRef : null}
              className={`${
                validationErrors.columns[index]
                  ? 'border-red border-opacity-100 placeholder:text-red placeholder:text-right'
                  : 'border-slate-400 focus-visible:outline-none border-opacity-25'
              }  dark:bg-transparent text-[13px] font-medium leading-6 py-2 px-4 border outline-none rounded w-11/12 focus-visible:border-purple `}
              value={task.title}
              type='text'
              onChange={(e) => handleSubtaskTitleChange(index, e.target.value)}
              placeholder={
                validationErrors.columns[index]
                  ? "Can't be empty!"
                  : 'New subtask'
              }
            />
            <Button
              onClick={() => handleDeleteSubtask(column.id)}
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
        {context === 'Edit Board' ? 'Save Changes' : 'Create Board'}
      </Button> */}
    </div>
  );
}
