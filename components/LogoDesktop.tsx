import Image from 'next/image';
import { LOGO_DARK_SVG, LOGO_LIGHT_SVG } from '@/constans';
import { useTheme } from 'next-themes';

export default function LogoDesktop() {
  const { resolvedTheme } = useTheme();
  const logoSrc = resolvedTheme === 'light' ? LOGO_DARK_SVG : LOGO_LIGHT_SVG;

  return (
    <>
      <Image
        alt='kanban logo'
        src={logoSrc}
        width={150}
        height={25}
        className='absolute md:left-6 xl:left-[34px]'
      />
    </>
  );
}
