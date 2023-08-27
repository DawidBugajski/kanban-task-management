import React, { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { getActiveBoard, getBoards } from '@/redux/slices/boardsSlice';
import LogoMobile from './LogoMobile';
import Button from './shared/Button';
import Image from 'next/image';
import {
  ICON_ADD_TASK_MOBILE_SVG,
  ICON_CHEVRON_DOWN_SVG,
  ICON_CHEVRON_UP_SVG,
} from '@/constans';
import { useResponsive } from '@/hooks/useResponsive';
import SidebarBoards from './Sidebar/SidebarBoards';
import SidebarThemeToggle from './Sidebar/SidebarThemeToggle';
import { useAppDispatch } from '@/redux/hooks';
import { ModalContent, openModal, setView } from '@/redux/slices/modalSlice';
import PopoverItem from './shared/Popover';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  const { isMobileOrDesktop } = useResponsive();
  const activeBoard = useAppSelector(getActiveBoard);
  const mobileUser = !isMobileOrDesktop;

  return (
    <>
      <div className='flex-none w-full border-b-[1px] border-b-light-lines dark:border-b-dark-lines flex items-center justify-start h-16 text-center md:h-24 dark:bg-dark-grey'>
        {mobileUser && <LogoMobileWrapper />}
        <div className='relative flex items-center justify-between flex-grow gap-5 px-4 overflow-hidden lg:px-8'>
          <div className='flex items-center gap-2 overflow-hidden'>
            <h1 className='text-black truncate text-heading-l md:text-xl xl:text-heading-xl dark:text-white font-heading'>
              {activeBoard.name}
            </h1>
            {mobileUser && (
              <MobileSidebarIconToggle
                isOpen={isOpen}
                toggleSidebar={toggleSidebar}
              />
            )}
          </div>
          <div className='flex items-center gap-3 md:gap-6'>
            <AddNewTask isMobileOrDesktop={isMobileOrDesktop} />
            <PopoverItem context='Board' board={activeBoard} />
          </div>
        </div>
      </div>
      {mobileUser && isOpen && <MobileSidebar toggleSidebar={toggleSidebar} />}
    </>
  );
}

interface ToggleSidebarProps {
  toggleSidebar: () => void;
}

function LogoMobileWrapper() {
  return (
    <div className='flex items-center h-full md:w-[200px] xl:w-[300px] md:border-r-[1px] border-r-light-lines dark:border-dark-lines shrink-0'>
      <LogoMobile />
    </div>
  );
}
interface MobileSidebarIconToggleProps extends ToggleSidebarProps {
  isOpen: boolean;
}

function MobileSidebarIconToggle({
  toggleSidebar,
  isOpen,
}: MobileSidebarIconToggleProps) {
  return (
    <Image
      src={isOpen ? ICON_CHEVRON_UP_SVG : ICON_CHEVRON_DOWN_SVG}
      height={7}
      width={10}
      alt='icon arrow'
      className='cursor-pointer'
      onClick={toggleSidebar}
    />
  );
}

interface AddNewTaskProps {
  isMobileOrDesktop: boolean;
  handleAddNewTask?: () => void;
}

function AddNewTask({ isMobileOrDesktop }: AddNewTaskProps) {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(getActiveBoard);
  const disableButton = activeBoard.columns.length < 1;
  const handleAddNewTask = () => {
    dispatch(openModal());
    dispatch(setView(ModalContent.TASK_ADD));
  };
  return (
    <Button
      title={isMobileOrDesktop ? '+ Add New Task' : undefined}
      onClick={handleAddNewTask}
      disabled={disableButton}
      className='disabled:bg-[#d7d7f1] disabled:cursor-not-allowed flex items-center justify-center md:w-[164px] md:h-12 w-12 h-8 leading-none text-white transition-colors duration-100 rounded-full md:text-heading-m font-heading bg-purple hover:bg-purple-hover md:rounded-3xl'
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
  );
}

function MobileSidebar({ toggleSidebar }: ToggleSidebarProps) {
  const innerClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      onClick={toggleSidebar}
      className='absolute top-0 left-0 z-20 w-full h-full bg-bg-modal'
    >
      <div className='w-[16.5rem] left-1/2 transform -translate-x-1/2 h-auto border-r-0 rounded-md border-b-0 top-[5rem] shadow-md bg-white absolute dark:bg-dark-grey'>
        <SidebarBoards />
        <div onClick={innerClick} className='py-4'>
          <SidebarThemeToggle />
        </div>
      </div>
    </div>
  );
}
