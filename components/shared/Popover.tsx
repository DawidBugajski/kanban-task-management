import Image from 'next/image';
import { ICON_VERTICAL_ELLIPSIS_SVG } from '@/constans';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ModalContent, setView } from '@/redux/slices/modalSlice';
import { useAppDispatch } from '@/redux/hooks';

export default function PopoverItem() {
  const dispatch = useAppDispatch();

  return (
    <Popover>
      <PopoverTrigger className='focus-visible:outline-none'>
        <>
          <Image
            src={ICON_VERTICAL_ELLIPSIS_SVG}
            height={20}
            width={5}
            alt='dots'
          />
        </>
      </PopoverTrigger>
      <PopoverContent className='mt-4 font-medium'>
        <p
          onClick={() => dispatch(setView(ModalContent.EDIT))}
          className='cursor-pointer text-medium-grey hover:underline'
        >
          Edit Task
        </p>
        <p
          onClick={() => dispatch(setView(ModalContent.DELETE))}
          className='cursor-pointer text-red hover:underline'
        >
          Delete Task
        </p>
      </PopoverContent>
    </Popover>
  );
}
