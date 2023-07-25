'use client';
import { useState } from 'react';
import { logIn, logOut, toggleModerator } from '@/redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export default function TestLogin() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.value.isAuth);
  const [username, setUserName] = useState<string>('');

  const handleClickLogIn = () => {
    dispatch(logIn(username));
    setUserName('');
  };
  const handleClickToggle = () => {
    dispatch(toggleModerator());
  };
  const handleClickLogOut = () => {
    dispatch(logOut());
    setUserName('');
  };

  return (
    <div className='p-4 mt-2 border-2 border-black'>
      <input
        value={username}
        className='w-full text-black '
        type='text'
        onChange={(e) => setUserName(e.target.value)}
      />
      <hr className='py-2' />
      <button onClick={handleClickLogIn}>Log In</button>
      <hr className='py-2' />
      <button onClick={handleClickLogOut}>Log Out</button>
      <hr className='py-2' />
      {isAuth && (
        <button onClick={handleClickToggle}>Toggle Moderator Status</button>
      )}
    </div>
  );
}
