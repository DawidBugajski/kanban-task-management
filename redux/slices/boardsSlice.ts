import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Board, Data } from '@/types';
import { STARTING_DATA } from '@/constans';

const initialState: Data = {
  ...STARTING_DATA,
  activeBoardId: STARTING_DATA.boards[0].id,
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
      const activeBoard = state.boards.find(
        (board) => board.id === state.activeBoardId
      );
      if (!activeBoard) return;
      const sourceColumn = activeBoard.columns.find(
        (column) => column.id === sourceId
      );
      const destinationColumn = activeBoard.columns.find(
        (column) => column.id === destinationId
      );
      if (!sourceColumn || !destinationColumn) return;
      const [removed] = sourceColumn.tasks.splice(sourceIndex, 1);
      destinationColumn.tasks.splice(destinationIndex, 0, removed);
    },
  },
});

export const { setActiveBoard, moveTask } = boardsSlice.actions;
export const getBoards = (state: RootState): Board[] => state.boards.boards;
export const getActiveBoard = (state: RootState): Board =>
  state.boards.boards.find((board) => board.id === state.boards.activeBoardId)!;
// "!" - the expression before it will never be null or undefined - here always some board must be active
export default boardsSlice.reducer;
