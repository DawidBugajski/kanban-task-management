import React from 'react';
import Button from '../shared/Button';
import { getActiveBoard } from '@/redux/slices/boardsSlice';
import { useAppSelector } from '@/redux/hooks';

export default function DeleteBoard() {
  const activeBoard = useAppSelector(getActiveBoard);

  return (
    <div className='relative flex flex-col h-auto gap-6 p-6 md:p-8'>
      <h2 className='text-red heading-l font-heading'>Delete this board?</h2>
      <p className='font-body-l text-body-l text-medium-grey'>
        Are you sure you want to delete the ‘{activeBoard?.name}’ board? This
        action will remove all columns and tasks and cannot be reversed.
      </p>
      <div className='flex gap-4'>
        <Button
          // onClick={handleDeleteTask}
          className='transition-colors duration-100 hover:bg-red-hover text-body-l font-bold py-2 text-center text-white rounded-[20px] bg-red grow'
          onClick={function (): void {
            throw new Error('Function not implemented.');
          }}
        >
          Delete
        </Button>
        <Button
          // onClick={handleCancel}
          className='transition-colors duration-100 hover:bg-[#d8d7f1] text-body-l font-bold bg-[#f0effa] py-2 text-center text-purple rounded-[20px] grow'
          onClick={function (): void {
            throw new Error('Function not implemented.');
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
