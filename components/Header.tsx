import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { getActiveBoard } from '@/redux/slices/boardsSlice';
import Logo from './Logo';
import Button from './shared/Button';
import Image from 'next/image';
import { ICON_VERTICAL_ELLIPSIS_SVG } from '@/constans';

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
        <div className='flex items-center gap-6'>
          <Button
            title='+ Add new task'
            onClick={() => console.log('hej')}
            className='px-6 py-4 text-white transition-colors duration-100 text-heading-m font-heading bg-purple hover:bg-purple-hover rounded-3xl'
          />
          <Image
            src={ICON_VERTICAL_ELLIPSIS_SVG}
            height={20}
            width={5}
            alt='dots'
            className='cursor-pointer'
          />
        </div>
      </div>
    </div>
  );
}
