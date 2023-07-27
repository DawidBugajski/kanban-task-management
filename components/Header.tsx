import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { getActiveBoard } from '@/redux/slices/boardsSlice';
import LogoDesktop from './LogoDesktop';
import LogoMobile from './LogoMobile';
import Button from './shared/Button';
import Image from 'next/image';
import {
  ICON_VERTICAL_ELLIPSIS_SVG,
  ICON_ADD_TASK_MOBILE_SVG,
  ICON_CHEVRON_DOWN_SVG,
} from '@/constans';
import { useResponsive } from '@/hooks/useResponsive';

export default function Header() {
  const { isMobileOrDesktop } = useResponsive();

  const activeBoard = useAppSelector(getActiveBoard);
  return (
    <div className='flex items-center justify-start w-full h-16 text-center md:h-24 dark:bg-dark-grey'>
      <div className='flex items-center h-full md:w-[300px] md:border-r-[1px] border-r-light-lines dark:border-dark-lines'>
        {isMobileOrDesktop ? <LogoDesktop /> : <LogoMobile />}
      </div>
      <div className='relative flex items-center justify-between flex-grow gap-5 px-4 md:px-8'>
        <div className='flex items-center gap-2'>
          <h1 className='text-black text-heading-l md:text-heading-xl dark:text-white font-heading'>
            {activeBoard.name}
          </h1>
          {!isMobileOrDesktop && (
            <Image
              src={ICON_CHEVRON_DOWN_SVG}
              height={7}
              width={10}
              alt='icon down'
              className='cursor-pointer'
            />
          )}
        </div>

        <div className='flex items-center gap-3 md:gap-6'>
          <Button
            title={isMobileOrDesktop ? '+ Add new task' : undefined}
            onClick={() => console.log('hej')}
            className='flex items-center justify-center w-12 h-8 leading-none text-white transition-colors duration-100 rounded-full md:text-heading-m font-heading bg-purple hover:bg-purple-hover md:rounded-3xl'
          >
            {!isMobileOrDesktop && (
              <Image
                src={ICON_ADD_TASK_MOBILE_SVG}
                height={12}
                width={12}
                alt='add task'
              />
            )}
          </Button>
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
