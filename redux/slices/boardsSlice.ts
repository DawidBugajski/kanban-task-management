import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Board, Data } from '@/types';
import { STARTING_DATA } from '@/constans';

const initialState: Data = STARTING_DATA;

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setShowBoards: () => {
      console.log(initialState.boards);
    },
    setActiveBoard: () => {},
  },
});

export const { setShowBoards } = boardsSlice.actions;
//get single value from InitialState
export const getBoards = (state: RootState): Board[] => state.boards.boards;
export default boardsSlice.reducer;
