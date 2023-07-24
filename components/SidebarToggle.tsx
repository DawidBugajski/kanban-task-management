import React from 'react';
import Image from 'next/image';
import { ICON_HIDE_SIDEBAR_SVG } from '@/constans';

interface SidebarToggleProps {
  toggleSidebar: () => void;
}

export default function SidebarToggle({ toggleSidebar }: SidebarToggleProps) {
  return (
    <button
      onClick={toggleSidebar}
      className='ml-[31px] mt-8 inline-flex items-center gap-[10px] group cursor cursor-pointer'
    >
      <Image
        alt='eye icon'
        height={18}
        width={16}
        src={ICON_HIDE_SIDEBAR_SVG}
      />
      <p className='text-heading-m font-heading text-medium-grey group-hover:text-purple'>
        Hide Sidebar
      </p>
    </button>
  );
}
