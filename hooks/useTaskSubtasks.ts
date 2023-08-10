import { useState, useRef } from 'react';
import { Subtask } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export function useTaskSubtasks(initialSubtasks: Subtask[]) {
  const [localSubtasks, setLocalSubtasks] = useState(initialSubtasks);
  const lastInputRef = useRef<HTMLInputElement>(null);

  const handleAddSubtask = () => {
    const newSubtask: Subtask = {
      id: uuidv4(),
      title: '',
      isCompleted: false,
    };
    setLocalSubtasks([...localSubtasks, newSubtask]);

    // user after adding a subtask, can immediately type content
    setTimeout(() => {
      lastInputRef.current?.focus();
      lastInputRef.current?.select();
    }, 0);
  };

  const handleDeleteSubtask = (subtaskId: string) => {
    const updatedSubtasks = localSubtasks.filter(
      (task) => task.id !== subtaskId
    );
    setLocalSubtasks(updatedSubtasks);
  };

  const handleSubtaskTitleChange = (index: number, newTitle: string) => {
    const updatedLocalSubtasks = [...localSubtasks];
    updatedLocalSubtasks[index] = {
      ...updatedLocalSubtasks[index],
      title: newTitle,
    };
    setLocalSubtasks(updatedLocalSubtasks);
  };

  return {
    localSubtasks,
    handleAddSubtask,
    handleDeleteSubtask,
    handleSubtaskTitleChange,
    lastInputRef,
  };
}
