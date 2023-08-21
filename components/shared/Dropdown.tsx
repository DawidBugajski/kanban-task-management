import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Column } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  getActiveTask,
  moveTaskToColumn,
  getActiveBoard,
} from '@/redux/slices/boardsSlice';
import { closeModal } from '@/redux/slices/modalSlice';
interface DropdownProps {
  options: Column[];
  changeOnSave?: boolean; // if the parent component uses this component with prop === false, then when you change the item in the dropdown, the action in the reducer in redux is called and the component is rendered from scratch making the modal disabled
  onValueChange?: (newColumnId: string) => void;
  isEditMode?: boolean;
}

export default function Dropdown({
  options,
  changeOnSave,
  onValueChange,
  isEditMode,
}: DropdownProps) {
  const dispatch = useAppDispatch();
  const activeTask = useAppSelector(getActiveTask);
  const activeBoard = useAppSelector(getActiveBoard);
  const currentColumnForTask = activeBoard.columns.find((column) =>
    column.tasks.some((task) => task.id === activeTask?.id)
  );

  // update values in a component which do nothing, before clicking saveButton in parent Component
  const [tempColumn, setTempColumn] = useState<string | undefined>(
    currentColumnForTask?.id || options[0]?.id
  );

  const handleMoveTaskToColumn = (newColumnId: string) => {
    if (isEditMode && !activeTask) return;

    if (changeOnSave) {
      setTempColumn(newColumnId);
      if (onValueChange) onValueChange(newColumnId);
    } else {
      // changeOnSave === false
      dispatch(
        moveTaskToColumn({
          taskId: activeTask!.id, // "! => inform TypeScript that there is no null here, if you are absolutely sure that null is not possible."
          newColumnId,
        })
      );
      dispatch(closeModal());
    }
  };

  return (
    <Select value={tempColumn} onValueChange={handleMoveTaskToColumn}>
      <SelectTrigger className='w-full text-body-l font-body-l'>
        <SelectValue placeholder={'Change status'} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.id} value={option.id}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
