'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Boards from './Boards';
import SidebarToggle from './SidebarToggle';
import ThemeToggle from './ThemeToggle';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const handleSidebar = () => setIsOpen(!isOpen);

  const VisibleSidebar = () => {
    return (
      <motion.aside
        className='flex flex-col fixed top-0 left-0 z-10 h-screen overflow-hidden bg-white border-r-[1px] border-r-light-lines'
        initial={{ width: '300px' }}
        animate={{ width: isOpen ? '300px' : '0px' }}
        transition={{ duration: 0.2 }}
      >
        <Image
          alt='kanban logo'
          src={'/logo-dark.svg'}
          width={150}
          height={25}
          className='ml-[34px] mt-[32px] mb-[54px]'
        />
        <Boards />
        <div className='mt-auto mb-12'>
          <ThemeToggle />
          <SidebarToggle toggleSidebar={handleSidebar} />
        </div>
      </motion.aside>
    );
  };

  const ClosedSidebarButton = () => {
    return (
      <button
        onClick={handleSidebar}
        className='absolute left-0 bottom-12 w-14 h-12 bg-purple rounded-tr-[100px] rounded-br-[100px] flex items-center justify-center hover:bg-purple-hover transition-colors duration-100 cursor-pointer'
      >
        <Image
          src={'/icon-show-sidebar.svg'}
          height={11}
          width={16}
          alt='eye icon'
          className='mr-2'
        />
      </button>
    );
  };

  return <>{isOpen ? <VisibleSidebar /> : <ClosedSidebarButton />}</>;
}

export default Sidebar;
