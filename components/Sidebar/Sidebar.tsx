'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import SidebarBoards from './SidebarBoards';
import SidebarToggle from './SidebarToggle';
import SidebarThemeToggle from './SidebarThemeToggle';
import {
  LOGO_DARK_SVG,
  ICON_SHOW_SIDEBAR_SVG,
  LOGO_LIGHT_SVG,
} from '@/constans';
import { useTheme } from 'next-themes';

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
      className='dark:bg-dark-grey w-[300px] flex flex-col fixed top-0 left-0 z-10 h-screen overflow-hidden bg-white border-r-[1px] border-r-light-lines dark:border-r-dark-lines'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <SidebarContent toggleSidebar={toggleSidebar} />
    </motion.aside>
  );
}

function SidebarContent({ toggleSidebar }: SidebarToggleProps) {
  const { resolvedTheme } = useTheme();
  const logoSrc = resolvedTheme === 'light' ? LOGO_DARK_SVG : LOGO_LIGHT_SVG;
  return (
    <motion.aside
      className='w-[300px] flex flex-col fixed top-0 left-0 z-10 h-screen overflow-hidden border-r-[1px] border-r-light-lines dark:border-r-dark-lines'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Image
        alt='kanban logo'
        src={logoSrc}
        width={150}
        height={25}
        className='ml-[34px] mt-[32px] mb-[54px]'
      />
      <SidebarBoards />
      <div className='mt-auto mb-12'>
        <SidebarThemeToggle />
        <SidebarToggle toggleSidebar={toggleSidebar} />
      </div>
    </motion.aside>
  );
}

function ClosedSidebarButton({ toggleSidebar }: SidebarToggleProps) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onClick={toggleSidebar}
      className='absolute left-0 bottom-12 w-14 h-12 bg-purple rounded-tr-[100px] rounded-br-[100px] flex items-center justify-center hover:bg-purple-hover transition-colors duration-100 cursor-pointer'
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
