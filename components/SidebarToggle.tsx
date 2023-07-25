import React from 'react';
import Image from 'next/image';
import './Boards/board.css';
import { ICON_HIDE_SIDEBAR_SVG } from '@/constans';

interface SidebarToggleProps {
  toggleSidebar: () => void;
}

export default function SidebarToggle({ toggleSidebar }: SidebarToggleProps) {
  return (
    <div className='w-[276px] mt-2'>
      <div
        onClick={toggleSidebar}
        className='hover:bg-lightbg-hover-boards group cursor-pointer rounded-tr-[100px] rounded-br-[100px] transition-colors duration-100 dark:hover:bg-white'
      >
        <span className='inline-flex items-center h-12 gap-4 ml-9 text-heading-m font-heading text-medium-grey group-hover:text-purple'>
          <Image
            alt='eye icon'
            height={18}
            width={16}
            src={ICON_HIDE_SIDEBAR_SVG}
          />
          Hide Sidebar
        </span>
      </div>
    </div>
  );
}
