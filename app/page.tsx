'use client';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import TestLogin from '@/components/TestLogin';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { getName } from '@/redux/slices/authSlice';
import { setShowBoards } from '@/redux/slices/boardsSlice';

export default function Home() {
  const dispatch = useAppDispatch();
  //test-slice
  const username = useAppSelector(getName);
  const secondWayToGetUsername = useAppSelector(
    (state) => state.auth.value.username
  );
  const isModerator = useAppSelector((state) => state.auth.value.isModerator);

  const handleShowBoards = () => dispatch(setShowBoards());

  return (
    <main className='flex flex-col items-center justify-center min-h-screen dark:bg-darkbg-very-dark-grey dark:text-white'>
      <Header />
      <Sidebar />
      <h1 className='text-4xl text-center '>Current branch: feature/redux</h1>
      {/* TEST LOGIN FROM REDUX */}
      <div>
        <TestLogin />
        <h1>
          First way of get username:
          <span className='text-red-500'> {username}</span>
        </h1>
        <h1>
          Second way of get username:
          <span className='text-red-500'> {secondWayToGetUsername}</span>
        </h1>
        {isModerator && (
          <p className='text-green-600'>This user is moderator</p>
        )}
      </div>
      {/* TEST SHOW INFO ABOUT BOARDS FROM SLICE */}
      <button
        className='p-2 my-2 bg-blue-300 rounded-md'
        onClick={handleShowBoards}
      >
        Check id of active board
      </button>
    </main>
  );
}
