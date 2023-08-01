import React from 'react';
import Header from './Header';
import Dashboard from './Dashboard';
import { useResponsive } from '@/hooks/useResponsive';

interface MainContentProps {
  isOpen: boolean;
}

export default function MainContent({ isOpen }: MainContentProps) {
  const { isTabletOrDesktop } = useResponsive();

  const wrapperMargin = () => {
    if (!isOpen) return '';
    return isTabletOrDesktop ? 'md:ml-[300px]' : 'md:ml-[260px]';
  };

  return (
    <div
      className={`${wrapperMargin()} flex flex-col h-screen overflow-hidden`}
    >
      <Header />
      <div className='flex flex-col flex-grow overflow-auto'>
        <Dashboard />
      </div>
    </div>
  );
}
