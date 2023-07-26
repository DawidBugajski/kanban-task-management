import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { getActiveBoard } from '@/redux/slices/boardsSlice';
import Logo from './Logo';

export default function Header() {
  const activeBoard = useAppSelector(getActiveBoard);
  return (
    <div className='flex items-center justify-start w-full h-24 text-center dark:bg-dark-grey'>
      <div className='flex items-center h-full w-[300px] border-r-[1px] border-r-light-lines dark:border-dark-lines'>
        <Logo />
      </div>
      <div className='flex items-center justify-between flex-grow gap-5 px-8'>
        <h1 className='text-black text-heading-xl dark:text-white font-heading'>
          {activeBoard.name}
        </h1>
        <div className='flex'>
          <button className='p-2 mr-6 text-center text-white rounded-md bg-purple'>
            +Add new task
          </button>
          <span className='text-2xl'>.</span>
        </div>
      </div>
    </div>
  );
}
