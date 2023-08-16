import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { closeModal, isOpenModal } from '@/redux/slices/modalSlice';
import { resetActiveTask } from '@/redux/slices/boardsSlice';

type DialogProps = {
  children: React.ReactNode;
};

export default function Modal({ children }: DialogProps) {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(isOpenModal);

  const handleCloseModal = () => {
    dispatch(resetActiveTask());
    dispatch(closeModal());
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className='w-11/12 rounded-md dark:bg-dark-grey dark:text-white'>
        {children}
      </DialogContent>
    </Dialog>
  );
}
