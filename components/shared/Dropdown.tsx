import React from 'react';
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
}

export default function Dropdown({ options }: DropdownProps) {
  const dispatch = useAppDispatch();
  const activeTask = useAppSelector(getActiveTask);
  const activeBoard = useAppSelector(getActiveBoard);
  const currentColumnForTask = activeBoard.columns.find((column) =>
    column.tasks.some((task) => task.id === activeTask?.id)
  );

  const handleMoveTaskToColumn = (newColumnId: string) => {
    if (!activeTask) return;

    dispatch(
      moveTaskToColumn({
        taskId: activeTask.id,
        newColumnId,
      })
    );
  };

  return (
    <Select
      value={currentColumnForTask?.id}
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
