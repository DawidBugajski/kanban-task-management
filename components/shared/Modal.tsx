import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAppSelector } from '@/redux/hooks';
import { useCloseModal } from '@/hooks/useCloseModal';
import { currentModalContent, isOpenModal } from '@/redux/slices/modalSlice';

type DialogProps = {
  children: React.ReactNode;
};

export default function Modal({ children }: DialogProps) {
  const isOpen = useAppSelector(isOpenModal);
  const isEditingColumnColor = useAppSelector(currentModalContent);
  const handleCloseModal = useCloseModal();

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent
        className={`w-11/12 rounded-md dark:bg-dark-grey dark:text-white ${
          isEditingColumnColor && 'overflow-hidden'
        }`}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
