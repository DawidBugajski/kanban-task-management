import { Subtask } from '@/types';
import { useState } from 'react';

export function useValidationErrors(initialErrors: {
  title: boolean;
  subtasks: boolean[];
}) {
  const [validationErrors, setValidationErrors] = useState(initialErrors);

  const validateChanges = (title: string, localSubtasks: Subtask[]) => {
    const errors = {
      title: title.trim() === '',
      subtasks: localSubtasks.map((subtask) => subtask.title.trim() === ''),
    };

    if (errors.title || errors.subtasks.some((error) => error)) {
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
