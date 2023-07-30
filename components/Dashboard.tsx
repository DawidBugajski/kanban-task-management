import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { DropResult } from 'react-beautiful-dnd';
import { getActiveBoard, moveTask } from '@/redux/slices/boardsSlice';
import { Board, Task } from '@/types';
import AddColumn from './AddColumn';
import TaskCard from './TaskCard';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(getActiveBoard);

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
      <div className='flex flex-grow gap-6'>
        {activeBoard.columns.map(({ id, name, tasks }) => (
          <Droppable droppableId={id} key={id}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <div className='w-[280px]'>
                  <h2 className='mb-6 uppercase text-heading-s font-heading tracking-heading-s text-medium-grey'>
                    {name} ({tasks.length})
                  </h2>
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
    </DragDropContext>
  );
}
