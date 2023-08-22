import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { DropResult } from 'react-beautiful-dnd';
import { getActiveBoard, moveTask } from '@/redux/slices/boardsSlice';

import AddColumn from './AddColumn';
import TaskCard from './Task/TaskCard';
import { isOpenModal } from '@/redux/slices/modalSlice';
import ModalWrapper from './ModalWrapper';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(getActiveBoard);
  const isModalOpen = useAppSelector(isOpenModal);
  const dotsColors = ['bg-sky-400', 'bg-violet-500', 'bg-emerald-300'];

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    dispatch(
      moveTask({
        sourceId: source.droppableId,
        destinationId: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    );
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className='flex flex-col flex-grow p-6 text-black dark:text-white bg-lightbg-light-grey dark:bg-darkbg-very-dark-grey min-w-max'>
        <div className='flex flex-grow gap-6'>
          {activeBoard.columns.map(({ id, name, tasks }, index) => (
            <Droppable droppableId={id} key={id}>
              {(provided) => (
                <div
                  className='w-[280px]'
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
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
                    {tasks.map((task, index) => (
                      <TaskCard key={task.id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
          {activeBoard && activeBoard.columns.length > 0 && <AddColumn />}
        </div>
      </div>
      {isModalOpen && <ModalWrapper />}
    </DragDropContext>
  );
}
