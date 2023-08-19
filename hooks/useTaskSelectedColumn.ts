import { useState } from 'react';

export function useSelectedColumn(initialColumnId: string | null) {
  const [selectedColumn, setSelectedColumn] = useState(initialColumnId);

  const handleColumnChange = (newColumnId: string) =>
    setSelectedColumn(newColumnId);

  return {
    selectedColumn,
    handleColumnChange,
  };
}
