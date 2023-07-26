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
    setShowBoards: () => {
      console.log(initialState);
    },
    setActiveBoard: (state, action: PayloadAction<string>) => {
      state.activeBoardId = action.payload;
      console.log(state.activeBoardId);
    },
  },
});

export const { setShowBoards, setActiveBoard } = boardsSlice.actions;
export const getBoards = (state: RootState): Board[] => state.boards.boards;
export const getActiveBoard = (state: RootState): Board =>
  state.boards.boards.find((board) => board.id === state.boards.activeBoardId)!;
// "!" - the expression before it will never be null or undefined - here always some board must be active
export default boardsSlice.reducer;
