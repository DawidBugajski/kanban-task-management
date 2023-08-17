import { useDispatch } from 'react-redux';
import { Task } from '@/types';
import { openModal } from '@/redux/slices/modalSlice';
import { setActiveTask } from '@/redux/slices/boardsSlice';

const useSetActiveTask = (task: Task) => {
  const dispatch = useDispatch();

  const handleSetActiveCard = () => {
    dispatch(setActiveTask(task));
    dispatch(openModal(task));
  };

  return handleSetActiveCard;
};

export default useSetActiveTask;
