'use client';
import Dashboard from '@/components/Dashboard';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar/Sidebar';

export default function Home() {
  return (
    <main className='flex flex-col items-center min-h-screen dark:bg-darkbg-very-dark-grey dark:text-white'>
      <Header />
      <Dashboard />
      <Sidebar />
    </main>
  );
}
