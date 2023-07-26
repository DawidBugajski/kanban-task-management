'use client';
import Dashboard from '@/components/Dashboard';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar/Sidebar';

export default function Home() {
  return (
    <main className='flex min-h-screen dark:bg-darkbg-very-dark-grey dark:text-white'>
      <Sidebar />
      <div className='relative flex flex-col flex-grow w-full'>
        <Header />
        <Dashboard />
      </div>
    </main>
  );
}
