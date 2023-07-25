'use client';
import Sidebar from '@/components/Sidebar';
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
  const handleShowBoards = dispatch(setShowBoards());

  return (
    <main className='flex flex-col items-center justify-center min-h-screen dark:bg-darkbg-very-dark-grey dark:text-white'>
      <Sidebar />
      <h1 className='text-4xl text-center '>Current branch: feature/redux</h1>
      <p className='font-heading text-heading-xl '>
        HEADING XL - 24PX/30PX - BOLD
      </p>
      <p className='font-heading text-heading-l '>
        HEADING XL - 18PX/23PX - BOLD
      </p>
      <p className='font-heading text-heading-m '>
        HEADING XL - 15PX/19PX - BOLD
      </p>
      <p className='font-heading tracking-heading-s text-heading-s'>
        HEADING XL - 12PX/15PX LETTERSPACING - BOLD
      </p>
      <br />
      <p className='font-body-l text-body-l'>BODY L - 13PX/23PX - MEDIUM</p>
      <p className='font-body-m text-body-m'>BODY M - 12PX/15PX - BOLD</p>
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
      <button onClick={() => dispatch(setShowBoards())}>CURRENT BOARDS</button>
    </main>
  );
}
