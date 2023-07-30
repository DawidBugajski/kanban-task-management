import Image from 'next/image';
import { motion } from 'framer-motion';
import { ICON_LIGHT_THEME_SVG, ICON_DARK_THEME_SVG } from '@/constans';
import { useToggleTheme } from '@/hooks/useToggleTheme';

export default function SidebarThemeToggle() {
  const { isToggled, toggleTheme } = useToggleTheme();

  const variants = {
    open: { left: '22px' },
    closed: { left: '3px' },
  };

  return (
    <div className='h-12 mx-3 rounded-md xl:mx-6 bg-lightbg-light-grey dark:bg-darkbg-very-dark-grey'>
      <div className='relative flex items-center justify-around w-full h-full'>
        <Image
          alt='logo'
          height={19}
          width={19}
          src={ICON_LIGHT_THEME_SVG}
          className='ml-auto'
        />
        <button
          className='relative w-10 h-5 mx-6 cursor-pointer group'
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
          className='mr-auto'
          alt='logo'
          height={19}
          width={19}
          src={ICON_DARK_THEME_SVG}
        />
      </div>
    </div>
  );
}
