import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteTask, getActiveTask } from '@/redux/slices/boardsSlice';
import { ModalContent, closeModal, setView } from '@/redux/slices/modalSlice';

import Button from '../shared/Button';

export function DeleteTask() {
  const dispatch = useAppDispatch();
  const activeTask = useAppSelector(getActiveTask);

  const handleCancel = () => dispatch(setView(ModalContent.TASK_DETAILS));

  const handleDeleteTask = () => {
    if (activeTask) {
      dispatch(deleteTask({ taskId: activeTask?.id }));
      dispatch(closeModal());
    }
  };

  return (
    <div className='relative flex flex-col h-auto gap-6 p-6 md:p-8'>
      <h2 className='text-red heading-l font-heading'>Delete this task?</h2>
      <p className='font-body-l text-body-l text-medium-grey'>
        Are you sure you want to delete the ‘{activeTask?.title}’ task and its
        subtasks? This action cannot be reversed.
      </p>
      <div className='flex gap-4'>
        <Button
          onClick={handleDeleteTask}
          className='transition-colors duration-100 hover:bg-red-hover text-body-l font-bold py-2 text-center text-white rounded-[20px] bg-red grow'
        >
          Delete
        </Button>
        <Button
          onClick={handleCancel}
          className='transition-colors duration-100 hover:bg-[#d8d7f1] text-body-l font-bold bg-[#f0effa] py-2 text-center text-purple rounded-[20px] grow'
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
