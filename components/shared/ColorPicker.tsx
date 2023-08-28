import { useCloseModal } from '@/hooks/useCloseModal';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {
  getActiveColumn,
  updateDotColorColumn,
} from '@/redux/slices/boardsSlice';
import { ModalContent, setView } from '@/redux/slices/modalSlice';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import Button from './Button';

export default function ColorPicker() {
  const dispatch = useAppDispatch();
  const handleCloseModal = useCloseModal();
  const activeColumn = useAppSelector(getActiveColumn);
  const currentColor =
    activeColumn?.color.replace('bg-[', '').replace(']', '') || '';

  const [color, setColor] = useState(currentColor);

  const handleSaveChanges = () => {
    if (!activeColumn?.color) return;

    dispatch(
      updateDotColorColumn({
        columnId: activeColumn.id,
        color,
      })
    );
    dispatch(handleCloseModal);
    dispatch(setView(ModalContent.NONE));
  };

  return (
    <div className='flex flex-col items-center min-h-[500px]'>
      <HexColorPicker className='' color={color} onChange={setColor} />
      <Button
        onClick={handleSaveChanges}
        className='transition-colors duration-100 hover:bg-purple-hover text-body-l font-bold bg-purple py-2 text-center text-white rounded-[20px] w-1/2 mx-auto mb-2'
      >
        Save
      </Button>
    </div>
  );
}
