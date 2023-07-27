import { Task } from '@/types';
import React from 'react';

export default function TaskCard(task: Task) {
  const { subtasks } = task;
  const completedSubtasks = subtasks.filter((subtask) => subtask.isCompleted);

  return (
    <div
      className='group cursor-pointer px-4 py-[23px] gap-2 flex flex-col justify-center bg-white dark:bg-dark-grey rounded-lg shadow-[0px_4px_6px_0px_rgba(54,_78,_126,_0.10)]'
      key={task.id}
    >
      <h3 className='transition-colors duration-100 text-heading-m font-heading group-hover:text-purple'>
        {task.title}
      </h3>
      <p className='text-body-m font-heading text-medium-grey '>
        {completedSubtasks.length} of {subtasks.length} subtasks
      </p>
    </div>
  );
}
