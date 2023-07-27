import React from 'react';

export default function LoadingDots() {
  return (
    <div className='relative flex items-center justify-center min-h-screen bg-darkbg-very-dark-grey bouncing-loader shadow-left'>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
