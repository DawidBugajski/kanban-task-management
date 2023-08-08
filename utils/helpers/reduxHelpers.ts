import { Data, Board } from '@/types';

export const findActiveBoard = (state: Data): Board | undefined => {
  return state.boards.find((board) => board.id === state.activeBoardId);
};

export const findTaskById = (
  activeBoard: Board | undefined,
  taskId: string
) => {
  return activeBoard
    ? activeBoard.columns
        .flatMap((column) => column.tasks)
        .find((task) => task.id === taskId)
    : null;
};
