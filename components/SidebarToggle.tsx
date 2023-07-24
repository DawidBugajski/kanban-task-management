import React from 'react';
import Image from 'next/image';

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
        src={'/icon-hide-sidebar.svg'}
      />
      <p className='text-heading-m font-heading text-medium-grey group-hover:text-purple'>
        Hide Sidebar
      </p>
    </button>
  );
}
