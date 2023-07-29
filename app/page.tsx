'use client';
import { useState, useEffect } from 'react';

import Sidebar from '@/components/Sidebar/Sidebar';
import LoadingDots from '@/components/shared/LoadingDots';
import MainContent from '@/components/MainContent';

export default function Home() {
  // load userColorTheme from LocalStorage
  const [isClient, setIsClient] = useState(false);
  // sidebar
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <LoadingDots />;

  return (
    <main className='grid grid-rows-[auto,1fr] dark:bg-darkbg-very-dark-grey dark:text-white min-h-screen'>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <MainContent isOpen={isOpen} />
    </main>
  );
}
