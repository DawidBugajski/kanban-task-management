import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { getActiveBoard } from '@/redux/slices/boardsSlice';

export default function Header() {
  const activeBoard = useAppSelector(getActiveBoard);
  return (
    <div className='w-full h-24 text-center'>
      <h1 className='text-black text-heading-xl dark:text-white font-heading'>
        {activeBoard.name}
      </h1>
    </div>
  );
}
