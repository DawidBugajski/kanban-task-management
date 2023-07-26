import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { getActiveBoard } from '@/redux/slices/boardsSlice';
import Logo from './Logo';

export default function Header() {
  const activeBoard = useAppSelector(getActiveBoard);
  return (
    <div className='dark:bg-dark-grey w-full h-24 text-center border-b-[1px] border-b-light-lines dark:border-b-dark-lines flex justify-center items-center'>
      <Logo />
      <h1 className='text-black text-heading-xl dark:text-white font-heading'>
        {activeBoard.name}
      </h1>
    </div>
  );
}
