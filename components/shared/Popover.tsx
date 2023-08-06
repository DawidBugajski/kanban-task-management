import Image from 'next/image';
import { ICON_VERTICAL_ELLIPSIS_SVG } from '@/constans';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TaskView } from '@/types';

interface PopoverItemProps {
  setView: React.Dispatch<React.SetStateAction<TaskView>>;
}

export default function PopoverItem({ setView }: PopoverItemProps) {
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
          onClick={() => setView(TaskView.Edit)}
          className='cursor-pointer text-medium-grey hover:underline'
        >
          Edit Task
        </p>
        <p
          onClick={() => setView(TaskView.Delete)}
          className='cursor-pointer text-red hover:underline'
        >
          Delete Task
        </p>
      </PopoverContent>
    </Popover>
  );
}
