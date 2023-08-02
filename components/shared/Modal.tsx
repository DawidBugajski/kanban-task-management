import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

type DialogProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ children, isOpen, onClose }: DialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='w-11/12 rounded-tl-md rounded-bl-md dark:bg-dark-grey dark:text-white'>
        {children}
      </DialogContent>
    </Dialog>
  );
}
