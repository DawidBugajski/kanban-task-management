import React from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { addColumn } from '@/redux/slices/boardsSlice';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '@/types';

export default function AddColumn() {
  const dispatch = useAppDispatch();

  const handleAddColumn = () => {
    const localColumn = {
      id: uuidv4(),
      name: 'Default Title',
      tasks: [] as Task[],
    };

    dispatch(addColumn({ column: localColumn }));
  };

  return (
    <div
      onClick={handleAddColumn}
      className='dark:bg-[#22232e] cursor-pointer hover:text-purple mt-10 bg-[#eaeffb] w-[280px] grid place-items-center rounded-md font-heading text-heading-xl text-medium-grey '
    >
      + New Column
    </div>
  );
}
