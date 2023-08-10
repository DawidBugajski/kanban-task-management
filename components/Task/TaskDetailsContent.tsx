import { SubtaskListProps, TaskDetailsViewProps } from '@/types/taskTypes';
import PopoverItem from '../shared/Popover';
import Dropdown from '../shared/Dropdown';

export function TaskDetailsContent({
  activeBoardColumns,
  activeTask,
  handleToggleSubtask,
  setView,
}: TaskDetailsViewProps) {
  const { title, description, subtasks = [] } = activeTask || {};
  const totalSubtasks = subtasks.length;
  const completedSubtasks = subtasks.filter((task) => task.isCompleted).length;

  // if the user makes a list after the space, show the same, instead of on 1 line
  const formatTextWithLineBreaks = (text: string) => {
    return text
      .split('\n')
      .filter((line) => line.trim() !== '')
      .map((line, index, array) => (
        <>
          {line}
          {index < array.length - 1 && <br />}
        </>
      ));
  };
  return (
    <div className='relative flex flex-col h-auto p-6 md:p-8'>
      {title && (
        <div className='flex items-center mb-6 md:justify-between'>
          <p className='w-11/12 text-heading-l font-heading'>{title}</p>
          <PopoverItem setView={setView} />
        </div>
      )}
      {description && (
        <p className='mb-6 text-body-l text-medium-grey font-body-l'>
          {formatTextWithLineBreaks(description)}
        </p>
      )}
      <p className='mb-4 text-body-m font-body-m text-medium-grey'>
        Subtasks: ({completedSubtasks} of {totalSubtasks})
      </p>
      <SubtaskList
        subtasks={subtasks}
        handleToggleSubtask={handleToggleSubtask}
        activeTaskId={activeTask?.id || ''}
      />
      <div className='mt-4'>
        <p className='mb-2 text-body-m font-body-m text-medium-grey dark:text-white'>
          Current status
        </p>
        <Dropdown options={activeBoardColumns} />
      </div>
    </div>
  );
}

function SubtaskList({
  subtasks,
  handleToggleSubtask,
  activeTaskId,
}: SubtaskListProps) {
  return (
    <div className='flex flex-col gap-2 max-h-[35vh] overflow-y-auto'>
      {subtasks.map((task) => (
        <div
          className='flex flex-col p-3 transition-colors duration-150 rounded group dark:hover:bg-purple-inputs hover:bg-purple-inputs min-h-auto bg-lightbg-light-grey text-body-m font-body-m dark:bg-darkbg-very-dark-grey'
          key={task.id}
        >
          <div className='flex items-center gap-4'>
            <div
              className={`shrink-0 relative h-4 w-4 border ${
                task.isCompleted
                  ? 'bg-purple border-purple'
                  : 'bg-white border-bg-lightbg-light-grey'
              } rounded-sm`}
            >
              <input
                type='checkbox'
                onChange={() => handleToggleSubtask(activeTaskId, task.id)}
                checked={task.isCompleted}
                className='absolute top-0 left-0 w-full h-full rounded-sm appearance-none cursor-pointer'
              />
              {task.isCompleted && (
                <span className='absolute flex items-center justify-center w-full h-full text-white rounded-sm cursor-pointer pointer-events-none'>
                  ✓
                </span>
              )}
            </div>
            <p
              className={`text-body-m font-body-m ${
                task.isCompleted
                  ? 'line-through text-medium-grey group-hover:text-black'
                  : 'text-black dark:text-white group-hover:text-black'
              } overflow-wrap: break-word; word-break: break-word;`}
            >
              {task.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
