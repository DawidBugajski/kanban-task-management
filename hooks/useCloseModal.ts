import { useAppDispatch } from '@/redux/hooks';
import { closeModal } from '@/redux/slices/modalSlice';
import { resetActiveTask } from '@/redux/slices/boardsSlice';

export const useCloseModal = () => {
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(resetActiveTask());
    dispatch(closeModal());
  };

  return handleCloseModal;
};
