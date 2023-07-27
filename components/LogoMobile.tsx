import Image from 'next/image';
import { LOGO_MOBILE_SVG } from '@/constans';

export default function LogoMobile() {
  return (
    <>
      <Image
        className='ml-4'
        alt='kanban logo'
        src={LOGO_MOBILE_SVG}
        width={24}
        height={25}
      />
    </>
  );
}
