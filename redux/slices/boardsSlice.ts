import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Board, Column, Data, Subtask, Task, COLOR_MAP } from '@/types';
import { STARTING_DATA } from '@/constans';
import { findActiveBoard, findTaskById } from '@/utils/helpers/reduxHelpers';

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
      activeColumn: null,
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
    setActiveColumn: (state, action: PayloadAction<Column>) => {
      state.activeColumn = action.payload;
    },
    resetActiveColumn: (state) => {
      state.activeColumn = null;
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
      const activeBoard = findActiveBoard(state);

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

      const activeBoard = findActiveBoard(state);

      if (!activeBoard) return;

      const task = findTaskById(activeBoard, taskId);

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

      const activeBoard = findActiveBoard(state);

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

      const activeBoard = findActiveBoard(state);

      if (!activeBoard) return;

      activeBoard.columns.forEach((column) => {
        const taskIndex = column.tasks.findIndex((task) => task.id === taskId);

        if (taskIndex !== -1) column.tasks.splice(taskIndex, 1);
      });

      if (state.activeTask && state.activeTask.id === taskId) {
        state.activeTask = null;
      }
    },
    deleteSubtask: (state, action: PayloadAction<{ subtaskId: string }>) => {
      const { subtaskId } = action.payload;

      const activeBoard = findActiveBoard(state);

      if (!activeBoard) return;

      activeBoard.columns.forEach((column) => {
        column.tasks.forEach((task) => {
          const subtaskIndex = task.subtasks.findIndex(
            (subtask) => subtask.id === subtaskId
          );

          if (subtaskIndex !== -1) task.subtasks.splice(subtaskIndex, 1);
        });
      });
    },
    deleteColumn: (state, action: PayloadAction<{ columnId: string }>) => {
      const { columnId } = action.payload;
      const activeBoard = findActiveBoard(state);

      if (!activeBoard) return;

      const columnIndex = activeBoard.columns.findIndex(
        (column) => column.id === columnId
      );
      if (columnIndex !== -1) {
        activeBoard.columns.splice(columnIndex, 1);
      }
    },
    deleteBoard: (state, action: PayloadAction<{ boardId: string }>) => {
      const { boardId } = action.payload;
      const boardIndex = state.boards.findIndex(
        (board) => board.id === boardId
      );

      if (state.boards.length <= 1) return;

      if (boardIndex !== -1) {
        state.boards.splice(boardIndex, 1);

        if (state.activeBoardId === boardId) {
          state.activeBoardId = state.boards[0].id;
        }
      }
    },
    updateSubtaskTitles: (
      state,
      action: PayloadAction<{ taskId: string; subtasks: Subtask[] }>
    ) => {
      const { taskId, subtasks } = action.payload;

      const activeBoard = findActiveBoard(state);

      if (!activeBoard) return;

      const task = findTaskById(activeBoard, taskId);

      if (!task) return;

      task.subtasks = subtasks; // Update subtask titles

      if (state.activeTask && state.activeTask.id === taskId) {
        state.activeTask = { ...task };
      }
    },
    updateColumnName: (
      state,
      action: PayloadAction<{ columnId: string; name: string }>
    ) => {
      const { columnId, name } = action.payload;
      const activeBoard = findActiveBoard(state);
      if (!activeBoard) return;

      const column = activeBoard.columns.find(
        (column) => column.id === columnId
      );
      if (column) {
        column.name = name;
      }
    },
    updateTaskTitle: (
      state,
      action: PayloadAction<{ taskId: string; title: string }>
    ) => {
      const { taskId, title } = action.payload;

      const activeBoard = findActiveBoard(state);

      if (!activeBoard) return;

      const task = findTaskById(activeBoard, taskId);

      if (!task) return;

      task.title = title;
    },
    updateBoardTitle: (state, action: PayloadAction<{ title: string }>) => {
      const { title } = action.payload;
      const activeBoard = findActiveBoard(state);
      if (!activeBoard) return;
      activeBoard.name = title;
    },
    updateTaskDescription: (
      state,
      action: PayloadAction<{ taskId: string; description: string }>
    ) => {
      const { taskId, description } = action.payload;

      const activeBoard = findActiveBoard(state);

      if (!activeBoard) return;

      const task = findTaskById(activeBoard, taskId);

      if (!task) return;

      task.description = description;
    },
    addSubtask: (
      state,
      action: PayloadAction<{ taskId: string; subtask: Subtask }>
    ) => {
      const { taskId, subtask } = action.payload;

      const activeBoard = findActiveBoard(state);

      if (!activeBoard) return;

      const task = findTaskById(activeBoard, taskId);

      if (!task) return;

      task.subtasks.push(subtask);

      if (state.activeTask && state.activeTask.id === taskId) {
        state.activeTask = { ...task };
      }
    },
    addTask: (
      state,
      action: PayloadAction<{ columnId: string; task: Task }>
    ) => {
      const { columnId, task } = action.payload;

      const activeBoard = findActiveBoard(state);

      if (!activeBoard) return;

      const column = activeBoard.columns.find(
        (column) => column.id === columnId
      );

      if (!column) return;

      column.tasks.push(task);
    },
    addColumn: (state, action: PayloadAction<{ column: Column }>) => {
      const { column } = action.payload;

      const activeBoard = findActiveBoard(state);
      if (!activeBoard) return;

      activeBoard.columns.push(column);
    },
    addBoard2: (state, action: PayloadAction<Board>) => {
      const defaultColors = Object.values(COLOR_MAP).slice(0, 3);
      console.log(defaultColors);

      action.payload.columns.forEach((column, index) => {
        if (index < defaultColors.length) {
          column.color = defaultColors[index];
        } else {
          column.color = COLOR_MAP.yellow;
        }
      });

      state.boards.push(action.payload);
      state.activeBoardId = action.payload.id;
    },
    addBoard: (state, action: PayloadAction<Board>) => {
      const defaultColors = ['bg-[#38BDF8]', 'bg-[#8B5CF6]', 'bg-[#6EE7B7]'];

      action.payload.columns.forEach((column, index) => {
        if (index < defaultColors.length) {
          column.color = defaultColors[index];
        } else {
          column.color = 'bg-[#FACC15]';
        }
      });

      state.boards.push(action.payload);
      state.activeBoardId = action.payload.id;
    },
    updateDotColorColumn: (
      state,
      action: PayloadAction<{ columnId: string; color: string }>
    ) => {
      const { columnId, color } = action.payload;
      const activeBoard = findActiveBoard(state);
      if (!activeBoard) return;

      const column = activeBoard.columns.find(
        (column) => column.id === columnId
      );
      if (column) column.color = color;
    },
  },
});

export const {
  setActiveBoard,
  setActiveColumn,
  resetActiveColumn,
  moveTask,
  setActiveTask,
  resetActiveTask,
  toggleSubtask,
  moveTaskToColumn,
  deleteTask,
  deleteSubtask,
  deleteColumn,
  deleteBoard,
  updateSubtaskTitles,
  updateTaskTitle,
  updateTaskDescription,
  updateBoardTitle,
  updateColumnName,
  addSubtask,
  addTask,
  addColumn,
  addBoard,
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
export const getActiveColumn = (state: RootState): Column | null => {
  const activeBoard = state.boards.boards.find(
    (board) => board.id === state.boards.activeBoardId
  );

  return activeBoard
    ? activeBoard.columns.find(
        (column) => column.id === state.boards.activeColumn?.id
      ) || null
    : null;
};

export default boardsSlice.reducer;
