import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from './slices/boardsSlice';

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
  },
});

// When the state changes, save it to localStorage.
store.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(store.getState().boards));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
