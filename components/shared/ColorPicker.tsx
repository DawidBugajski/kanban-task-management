import { useCloseModal } from '@/hooks/useCloseModal';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {
  getActiveColumn,
  updateDotColorColumn,
} from '@/redux/slices/boardsSlice';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

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
  };

  return (
    <div className='flex flex-col items-center'>
      <HexColorPicker color={color} onChange={setColor} />
      <button
        onClick={handleSaveChanges}
        className='w-1/3 p-2 mb-2 rounded-lg bg-purple'
      >
        Save
      </button>
    </div>
  );
}
