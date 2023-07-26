'use client';
import Dashboard from '@/components/Dashboard';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar/Sidebar';

export default function Home() {
  return (
    <main className='flex flex-col min-h-screen dark:bg-darkbg-very-dark-grey dark:text-white'>
      <Header />
      <div className='relative flex flex-grow w-full'>
        <Sidebar />
        <Dashboard />
      </div>
    </main>
  );
}
