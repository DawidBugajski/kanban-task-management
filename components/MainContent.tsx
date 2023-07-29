import React from 'react';
import Header from './Header';
import Dashboard from './Dashboard';

interface MainContentProps {
  isOpen: boolean;
}

export default function MainContent({ isOpen }: MainContentProps) {
  const wrapperMargin = isOpen ? 'ml-[300px]' : '';

  return (
    <div className={`${wrapperMargin} flex flex-col h-screen overflow-hidden`}>
      <Header />
      <div className='flex flex-col flex-grow overflow-auto'>
        <Dashboard />
      </div>
    </div>
  );
}
