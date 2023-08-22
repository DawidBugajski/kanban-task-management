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

  const handleSetTaskEdit = () => dispatch(setView(ModalContent.TASK_EDIT));
  const handleSetTaskDelete = () => dispatch(setView(ModalContent.TASK_DELETE));

  const handleSetBoardEdit = () => dispatch(setView(ModalContent.BOARD_EDIT));
  const handleSetBoardDelete = () =>
    dispatch(setView(ModalContent.BOARD_DELETE));

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
          onClick={handleSetTaskEdit}
          className='cursor-pointer text-medium-grey hover:underline'
        >
          Edit Task
        </p>
        <p
          onClick={handleSetTaskDelete}
          className='cursor-pointer text-red hover:underline'
        >
          Delete Task
        </p>
      </PopoverContent>
    </Popover>
  );
}
