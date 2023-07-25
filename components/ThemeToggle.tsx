import Image from 'next/image';
import { motion } from 'framer-motion';
import { ICON_LIGHT_THEME_SVG, ICON_DARK_THEME_SVG } from '@/constans';
import { useToggleTheme } from '@/hooks/useToggleTheme';

export default function ThemeToggle() {
  const { isToggled, toggleTheme } = useToggleTheme();

  const variants = {
    open: { left: '22px' },
    closed: { left: '3px' },
  };

  return (
    <div className='h-12 mx-6 rounded-md bg-lightbg-light-grey dark:bg-darkbg-very-dark-grey'>
      <div className='relative w-full h-full'>
        <Image
          className='left-[64px] top-[15px] absolute'
          alt='logo'
          height={19}
          width={19}
          src={ICON_LIGHT_THEME_SVG}
        />
        <button
          className='w-10 h-5 left-[106px] top-[14px] absolute cursor-pointer group'
          onClick={toggleTheme}
        >
          <div className='absolute top-0 left-0 w-10 h-5 transition-colors duration-100 bg-purple rounded-xl group-hover:bg-purple-hover' />
          <motion.div
            animate={isToggled ? 'open' : 'closed'}
            variants={variants}
            className='w-3.5 h-3.5 left-[3px] top-[3px] absolute bg-white rounded-full'
            transition={{ duration: 0.15 }}
          />
        </button>
        <Image
          className='left-[169.67px] top-[15px] absolute'
          alt='logo'
          height={19}
          width={19}
          src={ICON_DARK_THEME_SVG}
        />
      </div>
    </div>
  );
}
