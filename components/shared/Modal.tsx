import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type DialogProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
};

export default function Modal({ title, children, description }: DialogProps) {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className='w-11/12 rounded-md h-3/5 dark:bg-dark-grey dark:text-white'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
