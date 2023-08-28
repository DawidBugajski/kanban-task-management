import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Column } from '@/types';

export function useBoardColumns(initialColumns: Column[]) {
  const [localColumns, setLocalColumns] = useState(initialColumns);
  const lastInputRef = useRef<HTMLInputElement>(null);

  const handleAddColumn = () => {
    const newColumn: Column = {
      id: uuidv4(),
      name: '',
      tasks: [],
      color: '',
    };
    setLocalColumns([...localColumns, newColumn]);

    setTimeout(() => {
      lastInputRef.current?.focus();
      lastInputRef.current?.select();
    }, 0);
  };

  const handleDeleteColumn = (columnId: string) => {
    const updatedColumns = localColumns.filter(
      (column) => column.id !== columnId
    );
    setLocalColumns(updatedColumns);
  };

  const handleColumnNameChange = (index: number, newName: string) => {
    const updatedLocalColumns = [...localColumns];
    updatedLocalColumns[index] = {
      ...updatedLocalColumns[index],
      name: newName,
    };
    setLocalColumns(updatedLocalColumns);
  };

  return {
    localColumns,
    handleAddColumn,
    handleDeleteColumn,
    handleColumnNameChange,
    lastInputRef,
  };
}
