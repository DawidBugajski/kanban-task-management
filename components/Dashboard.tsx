import { useAppSelector } from '@/redux/hooks';
import { getActiveBoard } from '@/redux/slices/boardsSlice';
import { Board, Task } from '@/types';

export default function Dashboard() {
  const activeBoard = useAppSelector(getActiveBoard);

  const renderTasks = (activeBoard: Board) => {
    if (!activeBoard) return;

    return activeBoard.columns.map(({ id, name, tasks }) => (
      <ul key={id}>
        <h2 className='p-2 m-2 text-green-600 border-2 border-white'>{name}</h2>
        {tasks.map(({ title, id }: Task) => (
          <li key={id}>
            <h3>{title}</h3>
          </li>
        ))}
      </ul>
    ));
  };

  return (
    <div className='text-black dark:text-white border-t-[1px] border-t-light-lines dark:border-t-dark-lines flex flex-col items-center justify-center flex-grow bg-lightbg-light-grey dark:bg-darkbg-very-dark-grey'>
      <h1 className='text-4xl'>DASHBORD BRANCH</h1>
      <div className='flex'>{renderTasks(activeBoard)}</div>
    </div>
  );
}
