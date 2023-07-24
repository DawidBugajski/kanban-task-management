import Sidebar from '@/components/Sidebar';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen'>
      <Sidebar />
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
    </main>
  );
}
