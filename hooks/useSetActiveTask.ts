import { useDispatch } from 'react-redux';
import { Task } from '@/types';
import { ModalContent, openModal, setView } from '@/redux/slices/modalSlice';
import { setActiveTask } from '@/redux/slices/boardsSlice';

const useSetActiveTask = (task: Task) => {
  const dispatch = useDispatch();

  const handleSetActiveCard = () => {
    dispatch(setActiveTask(task));
    dispatch(openModal());
    dispatch(setView(ModalContent.TASK_DETAILS));
  };

  return handleSetActiveCard;
};

export default useSetActiveTask;
