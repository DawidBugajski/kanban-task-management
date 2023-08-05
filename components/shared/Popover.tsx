import React from 'react';
import Image from 'next/image';
import { ICON_VERTICAL_ELLIPSIS_SVG } from '@/constans';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export default function PopoverItem() {
  return (
    <Popover>
      <PopoverTrigger className=''>
        <>
          <Image
            src={ICON_VERTICAL_ELLIPSIS_SVG}
            height={20}
            width={5}
            alt='dots'
          />
        </>
      </PopoverTrigger>
      <PopoverContent className='mt-4'>
        <p className='text-medium-grey'>Edit Task</p>
        <p className='text-red'>Delete Task</p>
      </PopoverContent>
    </Popover>
  );
}
