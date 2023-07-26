import React from 'react';
import TestLogin from '@/components/TestLogin';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { getName } from '@/redux/slices/authSlice';
import { setShowBoards } from '@/redux/slices/boardsSlice';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  //test-slice
  const username = useAppSelector(getName);
  const secondWayToGetUsername = useAppSelector(
    (state) => state.auth.value.username
  );
  const isModerator = useAppSelector((state) => state.auth.value.isModerator);

  const handleShowBoards = () => dispatch(setShowBoards());

  return (
    <div className='dashboard'>
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
    </div>
  );
}
