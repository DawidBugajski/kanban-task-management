'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Boards from './Boards';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const handleSidebar = () => setIsOpen(!isOpen);

  const sidebarVariants = {
    open: { width: '300px' },
    closed: { width: '0px' },
  };

  return (
    <>
      <motion.aside
        className='pl-9 fixed top-0 left-0 z-10 h-screen overflow-hidden bg-white border-r-[1px] border-r-light-lines'
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
          className='mt-8 mb-14'
        />
        <Boards />
      </motion.aside>
    </>
  );
}

export default Sidebar;
