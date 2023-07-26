'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import SidebarBoards from './SidebarBoards';
import SidebarToggle from './SidebarToggle';
import SidebarThemeToggle from './SidebarThemeToggle';
import { ICON_SHOW_SIDEBAR_SVG } from '@/constans';

interface SidebarToggleProps {
  toggleSidebar: () => void;
}

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <AnimatePresence initial={false}>
      {isOpen ? (
        <VisibleSidebar toggleSidebar={toggleSidebar} />
      ) : (
        <ClosedSidebarButton toggleSidebar={toggleSidebar} />
      )}
    </AnimatePresence>
  );
}

function VisibleSidebar({ toggleSidebar }: SidebarToggleProps) {
  return (
    <motion.aside
      className='shrink-0 dark:bg-dark-grey w-[300px] flex flex-col z-10 h-calc[100%-96px] overflow-hidden bg-white border-r-[1px] border-r-light-lines dark:border-r-dark-lines'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <SidebarContent toggleSidebar={toggleSidebar} />
    </motion.aside>
  );
}

function SidebarContent({ toggleSidebar }: SidebarToggleProps) {
  return (
    <motion.div
      className='w-[300px] flex flex-col z-10 h-full overflow-hidden border-r-[1px] border-r-light-lines dark:border-r-dark-lines'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <SidebarBoards />
      <div className='mt-auto mb-12'>
        <SidebarThemeToggle />
        <SidebarToggle toggleSidebar={toggleSidebar} />
      </div>
    </motion.div>
  );
}

function ClosedSidebarButton({ toggleSidebar }: SidebarToggleProps) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3}}
      onClick={toggleSidebar}
      className='z-10 absolute left-0 bottom-12 w-14 h-12 bg-purple rounded-tr-[100px] rounded-br-[100px] flex items-center justify-center hover:bg-purple-hover transition-colors duration-100 cursor-pointer'
    >
      <Image
        src={ICON_SHOW_SIDEBAR_SVG}
        height={11}
        width={16}
        alt='eye icon'
        className='mr-2'
      />
    </motion.button>
  );
}

export default Sidebar;
