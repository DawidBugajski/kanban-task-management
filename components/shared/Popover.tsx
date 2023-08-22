import Image from 'next/image';
import { ICON_VERTICAL_ELLIPSIS_SVG } from '@/constans';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ModalContent, openModal, setView } from '@/redux/slices/modalSlice';
import { useAppDispatch } from '@/redux/hooks';
import { Board } from '@/types';

type ContextType = 'Task' | 'Board';

interface PopoverItemProps {
  context: ContextType;
  board?: Board;
}

export default function PopoverItem({ context, board }: PopoverItemProps) {
  const dispatch = useAppDispatch();

  const handleSetEdit = () => {
    if (context === 'Task') {
      dispatch(setView(ModalContent.TASK_EDIT));
    } else if (context === 'Board') {
      dispatch(setView(ModalContent.BOARD_EDIT));
    }
    dispatch(openModal());
  };

  const handleSetDelete = () => {
    if (context === 'Task') {
      dispatch(setView(ModalContent.TASK_DELETE));
    } else if (context === 'Board') {
      dispatch(setView(ModalContent.BOARD_DELETE));
    }
    dispatch(openModal());
  };

  return (
    <Popover>
      <PopoverTrigger className='focus-visible:outline-none'>
        <Image
          src={ICON_VERTICAL_ELLIPSIS_SVG}
          height={20}
          width={5}
          alt='dots'
        />
      </PopoverTrigger>
      <PopoverContent
        className={`font-medium ${
          context === 'Board'
            ? 'w-32 md:w-48 mt-3 mr-4 lg:mr-8 md:mt-6'
            : 'mt-4'
        }`}
      >
        <p
          onClick={handleSetEdit}
          className='cursor-pointer text-medium-grey hover:underline'
        >
          Edit {context}
        </p>
        <p
          onClick={handleSetDelete}
          className='cursor-pointer text-red hover:underline'
        >
          Delete {context}
        </p>
      </PopoverContent>
    </Popover>
  );
}
