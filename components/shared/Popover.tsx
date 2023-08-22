import Image from 'next/image';
import { ICON_VERTICAL_ELLIPSIS_SVG } from '@/constans';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ModalContent, setView } from '@/redux/slices/modalSlice';
import { useAppDispatch } from '@/redux/hooks';

type ContextType = 'Task' | 'Board';

interface PopoverItemProps {
  context: ContextType;
}

export default function PopoverItem({ context }: PopoverItemProps) {
  const dispatch = useAppDispatch();

  const handleSetTaskEdit = () => {
    context === 'Task'
      ? dispatch(setView(ModalContent.TASK_EDIT))
      : dispatch(setView(ModalContent.BOARD_EDIT));
  };

  const handleSetTaskDelete = () => {
    context === 'Task'
      ? dispatch(setView(ModalContent.TASK_DELETE))
      : dispatch(setView(ModalContent.BOARD_DELETE));
  };

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
      <PopoverContent
        className={` font-medium ${
          context === 'Board'
            ? 'w-32 md:w-48 mt-3 mr-4 lg:mr-8 md:mt-6'
            : 'mt-4'
        }`}
      >
        <p
          onClick={handleSetTaskEdit}
          className='cursor-pointer text-medium-grey hover:underline'
        >
          Edit {context}
        </p>
        <p
          onClick={handleSetTaskDelete}
          className='cursor-pointer text-red hover:underline'
        >
          Delete {context}
        </p>
      </PopoverContent>
    </Popover>
  );
}
