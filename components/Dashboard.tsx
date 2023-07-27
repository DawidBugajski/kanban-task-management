import { useAppSelector } from '@/redux/hooks';
import { getActiveBoard } from '@/redux/slices/boardsSlice';
import { Board, Task } from '@/types';
import TaskCard from './TaskCard';
import AddColumn from './AddColumn';

export default function Dashboard() {
  const activeBoard = useAppSelector(getActiveBoard);

  const renderTasks = (activeBoard: Board) => {
    if (!activeBoard) return;

    const dotsColors = ['bg-sky-400', 'bg-violet-500', 'bg-emerald-300'];

    return activeBoard.columns.map(({ id, name, tasks }, index) => (
      <div className='w-[280px] ' key={id}>
        <div className='flex gap-3'>
          <span
            className={`block w-[15px] h-[15px] rounded-full ${
              dotsColors[index % dotsColors.length]
            }`}
          />
          <h2 className='mb-6 uppercase text-heading-s font-heading tracking-heading-s text-medium-grey'>
            {name} ({tasks.length})
          </h2>
        </div>
        <div className='flex flex-col gap-5'>
          {tasks.map((task: Task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className='text-black dark:text-white border-t-[1px] border-t-light-lines dark:border-t-dark-lines flex flex-col flex-grow bg-lightbg-light-grey dark:bg-darkbg-very-dark-grey p-6 min-w-max min-h-screen'>
      <div className='flex flex-grow gap-6 xl:flex-grow-0'>
        {renderTasks(activeBoard)}
        {activeBoard && activeBoard.columns.length > 0 && <AddColumn />}
      </div>
    </div>
  );
}
