import { Column } from '@/types';
import { useState } from 'react';

export function useBoardValidationErrors(initialErrors: {
  title: boolean;
  columns: boolean[];
}) {
  const [validationErrors, setValidationErrors] = useState(initialErrors);

  const validateChanges = (title: string, localColumns: Column[]) => {
    const errors = {
      title: title.trim() === '',
      columns: localColumns.map((column) => column.name.trim() === ''),
    };

    if (errors.title || errors.columns.some((error) => error)) {
      setValidationErrors(errors);
      return false;
    }
    return true;
  };

  return {
    validationErrors,
    validateChanges,
  };
}
