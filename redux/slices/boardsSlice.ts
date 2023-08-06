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
    setActiveTask: (state, action: PayloadAction<Task>) => {
      state.activeTask = action.payload;
    },
    resetActiveTask: (state) => {
      state.activeTask = null;
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
    toggleSubtask: (
      state,
      action: PayloadAction<{ taskId: string; subtaskId: string }>
    ) => {
      const { taskId, subtaskId } = action.payload;

      const activeBoard = state.boards.find(
        (board) => board.id === state.activeBoardId
      );

      if (!activeBoard) return;

      const task = activeBoard.columns
        .flatMap((column) => column.tasks)
        .find((task) => task.id === taskId);

      if (!task) return;

      const subtask = task.subtasks.find((subtask) => subtask.id === subtaskId);

      if (!subtask) return;

      subtask.isCompleted = !subtask.isCompleted;

      if (state.activeTask && state.activeTask.id === taskId) {
        state.activeTask = { ...task };
      }
      // update the active task in initialstate to re-render correctly && user can click checkbox and see results w/o exiting and entering the same task
    },
    moveTaskToColumn: (
      state,
      action: PayloadAction<{
        taskId: string;
        newColumnId: string;
      }>
    ) => {
      const { taskId, newColumnId } = action.payload;

      const activeBoard = state.boards.find(
        (board) => board.id === state.activeBoardId
      );

      if (!activeBoard) return;

      let taskToMove: Task | null = null;
      activeBoard.columns.forEach((column) => {
        const taskIndex = column.tasks.findIndex((task) => task.id === taskId);

        if (taskIndex !== -1) {
          // Remove the task from the source column and save it to the variable "taskToMove"
          [taskToMove] = column.tasks.splice(taskIndex, 1);
        }
      });

      if (!taskToMove) return;
      // Find the destination column and insert the task

      const newColumn = activeBoard.columns.find(
        (column) => column.id === newColumnId
      );

      if (!newColumn) return;

      newColumn.tasks.push(taskToMove);
    },
    deleteTask: (state, action: PayloadAction<{ taskId: string }>) => {
      const { taskId } = action.payload;

      const activeBoard = state.boards.find(
        (board) => board.id === state.activeBoardId
      );

      if (!activeBoard) return;

      activeBoard.columns.forEach((column) => {
        const taskIndex = column.tasks.findIndex((task) => task.id === taskId);

        if (taskIndex !== -1) {
          // Remove the task from the column
          column.tasks.splice(taskIndex, 1);
        }
      });

      if (state.activeTask && state.activeTask.id === taskId) {
        state.activeTask = null;
      }
    },
  },
});

export const {
  setActiveBoard,
  moveTask,
  setActiveTask,
  resetActiveTask,
  toggleSubtask,
  moveTaskToColumn,
  deleteTask,
} = boardsSlice.actions;
export const getBoards = (state: RootState): Board[] => state.boards.boards;
export const getActiveBoard = (state: RootState): Board =>
  state.boards.boards.find((board) => board.id === state.boards.activeBoardId)!;
// "!" - the expression before it will never be null or undefined - here always some board must be active
export const getActiveTask = (state: RootState): Task | null => {
  const activeBoard = state.boards.boards.find(
    (board) => board.id === state.boards.activeBoardId
  );

  return activeBoard
    ? activeBoard.columns
        .flatMap((column) => column.tasks)
        .find((task) => task.id === state.boards.activeTask?.id) || null
    : null;
  // Prevent tasks to flip to other boards when refreshing the page
};

export default boardsSlice.reducer;
