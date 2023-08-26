import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { DropResult } from 'react-beautiful-dnd';
import {
  getActiveBoard,
  moveTask,
  setActiveColumn,
} from '@/redux/slices/boardsSlice';
import NewEmptyBoard from './board/NewEmptyBoard';
import AddColumn from './AddColumn';
import TaskCard from './Task/TaskCard';
import {
  ModalContent,
  isOpenModal,
  openModal,
  setView,
} from '@/redux/slices/modalSlice';
import ModalWrapper from './ModalWrapper';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(getActiveBoard);
  const isModalOpen = useAppSelector(isOpenModal);
  const dotsColors = [
    'bg-[#38bdf8]',
    'bg-[#8b5cf6]',
    'bg-[#6ee7b7]',
    'bg-[#facc15]',
  ];

  const handleSetActiveColumn = (columnId: string) => {
    const column = activeBoard.columns.find((col) => col.id === columnId);
    if (column) {
      dispatch(setActiveColumn(column));
      dispatch(setView(ModalContent.COLUMN_COLOR));
      dispatch(openModal());
    }
  };

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
        {activeBoard.columns.length > 0 ? (
          <div className='flex flex-grow gap-6'>
            {activeBoard.columns.map(({ id, name, tasks, color }, index) => (
              <Droppable droppableId={id} key={id}>
                {(provided) => (
                  <div
                    className='w-[280px]'
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <div className='flex gap-3'>
                      <span
                        style={{
                          backgroundColor: color
                            .replace('bg-[', '')
                            .replace(']', ''),
                        }}
                        onClick={() => handleSetActiveColumn(id)}
                        className='block w-[15px] h-[15px] rounded-full'
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
        ) : (
          <NewEmptyBoard />
        )}
      </div>
      {isModalOpen && <ModalWrapper />}
    </DragDropContext>
  );
}
