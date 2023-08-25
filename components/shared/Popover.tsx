import Image from 'next/image';
import { ICON_VERTICAL_ELLIPSIS_SVG } from '@/constans';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ModalContent, openModal, setView } from '@/redux/slices/modalSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Board } from '@/types';
import { getBoards } from '@/redux/slices/boardsSlice';

type ContextType = 'Task' | 'Board';

interface PopoverItemProps {
  context: ContextType;
  board?: Board;
}

export default function PopoverItem({ context }: PopoverItemProps) {
  const dispatch = useAppDispatch();
  const boards = useAppSelector(getBoards);
  const canDeleteBoard = context === 'Board' && boards.length > 1;
  console.log(canDeleteBoard);
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
        } ${canDeleteBoard && 'h-[94px]'}`}
      >
        <p
          onClick={handleSetEdit}
          className='cursor-pointer text-medium-grey hover:underline'
        >
          Edit {context}
        </p>
        {(context === 'Task' || canDeleteBoard) && (
          <p
            onClick={handleSetDelete}
            className='mt-4 cursor-pointer text-red hover:underline'
          >
            Delete {context}
          </p>
        )}
      </PopoverContent>
    </Popover>
  );
}
