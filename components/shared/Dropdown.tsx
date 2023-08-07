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
interface DropdownProps {
  options: Column[];
  changeOnSave?: boolean;
  onValueChange?: (newColumnId: string) => void;
}

export default function Dropdown({
  options,
  changeOnSave,
  onValueChange,
}: DropdownProps) {
  const dispatch = useAppDispatch();
  const activeTask = useAppSelector(getActiveTask);
  const activeBoard = useAppSelector(getActiveBoard);
  const currentColumnForTask = activeBoard.columns.find((column) =>
    column.tasks.some((task) => task.id === activeTask?.id)
  );

  // Lokalny stan dla tymczasowej wartości kolumny
  const [tempColumn, setTempColumn] = useState<string | undefined>(
    currentColumnForTask?.id
  );

  const handleMoveTaskToColumn = (newColumnId: string) => {
    if (!activeTask) return;

    if (changeOnSave) {
      setTempColumn(newColumnId); // Aktualizuje lokalny stan
      if (onValueChange) onValueChange(newColumnId); // Aktualizuje stan w komponencie nadrzędnym
    } else {
      // Wprowadza zmianę od razu
      dispatch(
        moveTaskToColumn({
          taskId: activeTask.id,
          newColumnId,
        })
      );
    }
  };

  return (
    <Select
      value={tempColumn} // Używa lokalnego stanu jako wartości
      onValueChange={handleMoveTaskToColumn}
    >
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
