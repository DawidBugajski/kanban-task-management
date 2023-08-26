import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from './slices/boardsSlice';
import modalReducer from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    modal: modalReducer,
  },
});

// When the state changes, save it to localStorage.
store.subscribe(() => {
  const { activeTask, activeColumn, ...stateWithoutActiveTask } =
    store.getState().boards; // remove activeTask from storage
  localStorage.setItem('state', JSON.stringify(stateWithoutActiveTask));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
