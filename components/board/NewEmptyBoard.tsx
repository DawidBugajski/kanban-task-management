import React from 'react';
import Button from '../shared/Button';
import { useAppDispatch } from '@/redux/hooks';
import { addColumn } from '@/redux/slices/boardsSlice';
import { v4 as uuidv4 } from 'uuid';
import { useCloseModal } from '@/hooks/useCloseModal';
import { Task } from '@/types';

export default function NewEmptyBoard() {
  const dispatch = useAppDispatch();
  const handleCloseModal = useCloseModal();
  const handleAddNewColumn = () => {
    const newColumn = {
      name: 'New Column',
      id: uuidv4(),
      tasks: [] as Task[],
      color: '',
    };
    dispatch(addColumn({ column: newColumn }));
    handleCloseModal();
  };

  return (
    <div className='grid h-full gap-8 place-content-center'>
      <p className='text-heading-l font-heading text-medium-grey'>
        This board is empty. Create a new column to get started.
      </p>
      <Button
        onClick={handleAddNewColumn}
        className='flex items-center justify-center p-4 mx-auto leading-none text-white transition-colors duration-100 rounded-full md:text-heading-m font-heading bg-purple hover:bg-purple-hover md:rounded-3xl'
      >
        + Add New Column
      </Button>
    </div>
  );
}
