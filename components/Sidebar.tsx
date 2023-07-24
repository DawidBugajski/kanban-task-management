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

  const sidebarVariants = {
    open: { width: '300px' },
    closed: { width: '0px' },
  };

  const HiddenSidebar = () => {
    return (
      <div
        onClick={handleSidebar}
        className='absolute top-0 left-0 h-12 p-2 text-white bg-black'
      >
        HiddenSidebar
      </div>
    );
  };

  return (
    <>
      {isOpen ? (
        <motion.aside
          className='flex flex-col fixed top-0 left-0 z-10 h-screen overflow-hidden bg-white border-r-[1px] border-r-light-lines'
          variants={sidebarVariants}
          initial='open' // No animation when the component mounts
          animate={isOpen ? 'open' : 'closed'} // Animations for subsequent state changes
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
      ) : (
        <HiddenSidebar />
      )}
    </>
  );
}

export default Sidebar;
