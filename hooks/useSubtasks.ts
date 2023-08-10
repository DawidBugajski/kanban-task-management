import { useState } from 'react';
import { Subtask } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export function useSubtasks(initialSubtasks: Subtask[]) {
  const [localSubtasks, setLocalSubtasks] = useState(initialSubtasks);

  const handleAddSubtask = () => {
    const newSubtask: Subtask = {
      id: uuidv4(),
      title: '',
      isCompleted: false,
    };
    setLocalSubtasks([...localSubtasks, newSubtask]);
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
  };
}
