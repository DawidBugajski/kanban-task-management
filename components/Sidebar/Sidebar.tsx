import { AnimatePresence, motion } from 'framer-motion';
import { useResponsive } from '@/hooks/useResponsive';
import Image from 'next/image';
import SidebarBoards from './SidebarBoards';
import SidebarToggle from './SidebarToggle';
import SidebarThemeToggle from './SidebarThemeToggle';
import { ICON_SHOW_SIDEBAR_SVG } from '@/constans';
import LogoDesktop from '../LogoDesktop';

interface SidebarToggleProps {
  toggleSidebar: () => void;
  isOpen?: boolean;
}

function Sidebar({ isOpen, toggleSidebar }: SidebarToggleProps) {
  return (
    <>
      <AnimatePresence initial={false}>
        {isOpen && <VisibleSidebar toggleSidebar={toggleSidebar} />}
      </AnimatePresence>
      {!isOpen && (
        <div className='hidden md:block'>
          <ClosedSidebarButton isOpen={isOpen} toggleSidebar={toggleSidebar} />
        </div>
      )}
    </>
  );
  // can't use ternary operator, animations aren't working properly
}

function VisibleSidebar({ toggleSidebar }: SidebarToggleProps) {
  const { isTabletOrDesktop } = useResponsive();
  const sidebarWidth = isTabletOrDesktop ? '300px' : '260px';

  return (
    <motion.aside
      className='dark:bg-dark-grey z-10 bg-white border-r-[1px] border-r-light-lines dark:border-r-dark-lines fixed h-screen overflow-hidden hidden md:block'
      initial={{ width: '0px' }}
      animate={{ width: sidebarWidth }}
      exit={{ width: '0px' }}
      transition={{ duration: 0.1 }}
    >
      <SidebarContent toggleSidebar={toggleSidebar} />
    </motion.aside>
  );
}
function SidebarContent({ toggleSidebar }: SidebarToggleProps) {
  return (
    <motion.div
      className='z-10 flex flex-col h-full'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <LogoDesktop />
      <SidebarBoards />
      <div className='md:mt-auto md:mb-12'>
        <SidebarThemeToggle />
        <SidebarToggle toggleSidebar={toggleSidebar} />
      </div>
    </motion.div>
  );
}

function ClosedSidebarButton({ toggleSidebar, isOpen }: SidebarToggleProps) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      onClick={toggleSidebar}
      className={`${
        isOpen ? 'invisible' : 'visible'
      } z-10 fixed left-0 bottom-12 w-14 h-12 bg-purple rounded-tr-[100px] rounded-br-[100px] flex items-center justify-center hover:bg-purple-hover transition-colors duration-100 cursor-pointer`}
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
