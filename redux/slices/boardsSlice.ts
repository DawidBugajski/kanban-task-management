import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Board, Data, Task } from '@/types';
import { STARTING_DATA } from '@/constans';

let savedState;

if (typeof window !== 'undefined') {
  savedState = localStorage.getItem('state');
}

const initialState: Data = savedState
  ? JSON.parse(savedState)
  : {
      ...STARTING_DATA,
      activeBoardId: STARTING_DATA.boards[0].id,
      activeTask: null,
    };

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setActiveBoard: (state, action: PayloadAction<string>) => {
      state.activeBoardId = action.payload;
    },
    moveTask: (
      state,
      action: PayloadAction<{
        sourceId: string;
        destinationId: string;
        sourceIndex: number;
        destinationIndex: number;
      }>
    ) => {
      const { sourceId, destinationId, sourceIndex, destinationIndex } =
        action.payload;

      // Searching for an active board in a state
      const activeBoard = state.boards.find(
        (board) => board.id === state.activeBoardId
      );

      if (!activeBoard) return;

      // Searching for a source and target column in the active table
      const sourceColumn = activeBoard.columns.find(
        (column) => column.id === sourceId
      );
      const destinationColumn = activeBoard.columns.find(
        (column) => column.id === destinationId
      );

      if (!sourceColumn || !destinationColumn) return;

      // Remove the task from the source column and save it to the variable "removed"
      const [removed] = sourceColumn.tasks.splice(sourceIndex, 1);

      // Insert the deleted task in the appropriate place in the target column
      destinationColumn.tasks.splice(destinationIndex, 0, removed);
    },
    setActiveTask: (state, action: PayloadAction<Task>) => {
      state.activeTask = action.payload;
    },
    resetActiveTask: (state) => {
      state.activeTask = null;
    },
  },
});

export const { setActiveBoard, moveTask, setActiveTask, resetActiveTask } =
  boardsSlice.actions;
export const getBoards = (state: RootState): Board[] => state.boards.boards;
export const getActiveBoard = (state: RootState): Board =>
  state.boards.boards.find((board) => board.id === state.boards.activeBoardId)!;
// "!" - the expression before it will never be null or undefined - here always some board must be active
export const getActiveTask = (state: RootState): Task | null =>
  state.boards.activeTask;

export default boardsSlice.reducer;
