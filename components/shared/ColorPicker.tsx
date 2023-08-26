import { useAppSelector } from '@/redux/hooks';
import { getActiveColumn } from '@/redux/slices/boardsSlice';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

export default function ColorPicker() {
  const activeColumn = useAppSelector(getActiveColumn);
  const currentColor = activeColumn?.color.replace('bg-[', '').replace(']', '');
  console.log(currentColor);
  const [color, setColor] = useState(currentColor);

  return (
    <div className={currentColor}>
      <HexColorPicker color={color} onChange={setColor} />
    </div>
  );
}
