import React from 'react';
import Image from 'next/image';
import { ICON_VERTICAL_ELLIPSIS_SVG } from '@/constans';

interface EditStateButtonProps {
  onClick: () => void;
  className?: string;
}

export function EditStateButton({ onClick, className }: EditStateButtonProps) {
  return (
    <button className={className} onClick={onClick}>
      <Image
        src={ICON_VERTICAL_ELLIPSIS_SVG}
        height={20}
        width={5}
        alt='dots'
      />
    </button>
  );
}
