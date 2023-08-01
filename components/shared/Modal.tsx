import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

type DialogProps = {
  children: React.ReactNode;
};

export default function Modal({ children }: DialogProps) {
  return (
    <Dialog defaultOpen={true}>
      <DialogContent className='w-11/12 rounded-md h-3/5 dark:bg-dark-grey dark:text-white'>
        {children}
      </DialogContent>
    </Dialog>
  );
}
