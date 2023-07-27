'use client';
import { useState, useEffect } from 'react';
import Dashboard from '@/components/Dashboard';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import LoadingDots from '@/components/shared/LoadingDots';

export default function Home() {
  // load userColorTheme from LocalStorage
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <LoadingDots />;

  return (
    <main className='grid grid-rows-[auto,1fr] md:min-h-screen dark:bg-darkbg-very-dark-grey dark:text-white'>
      <Header />
      <div className='relative grid grid-cols-[auto,1fr] w-full overflow-auto'>
        <Sidebar />
        <Dashboard />
      </div>
    </main>
  );
}
