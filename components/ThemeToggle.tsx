import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const variants = {
    open: { left: '22px' },
    closed: { left: '3px' },
  };

  return (
    <div className='h-12 mx-6 rounded-md bg-lightbg-light-grey'>
      <div className='relative w-full h-full'>
        <Image
          className='left-[64px] top-[15px] absolute'
          alt='logo'
          height={19}
          width={19}
          src={'/icon-light-theme.svg'}
        />
        <button
          className='w-10 h-5 left-[106px] top-[14px] absolute cursor-pointer'
          onClick={handleToggle}
        >
          <div className='absolute top-0 left-0 w-10 h-5 bg-purple rounded-xl' />
          <motion.div
            animate={isToggled ? 'open' : 'closed'}
            variants={variants}
            className='w-3.5 h-3.5 top-[3px] absolute bg-white rounded-full'
            transition={{ duration: 0.15 }}
            onClick={() => console.log('swap')}
          />
        </button>
        <Image
          className='left-[169.67px] top-[15px] absolute'
          alt='logo'
          height={19}
          width={19}
          src={'/icon-dark-theme.svg'}
        />
      </div>
    </div>
  );
}
