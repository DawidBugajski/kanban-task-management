import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Board, Task } from '@/types';

export enum ModalContent {
  NONE = 'none',
  TASK_DETAILS = 'task_details',
  TASK_EDIT = 'task_edit',
  TASK_DELETE = 'task_delete',
  TASK_ADD = 'task_add',
  BOARD_EDIT = 'board_edit',
  BOARD_DELETE = 'board_delete',
}

type ModalAction =
  | { type: 'task'; task: Task | null; action: 'details' | 'addNewTask' }
  | { type: 'board'; board: Board | null; action: 'edit' | 'delete' };

interface ModalState {
  isOpenModal: boolean;
  contentInsideModal: ModalContent;
  activeTask: Task | null;
  activeBoard: Board | null;
}

const initialState: ModalState = {
  isOpenModal: false,
  contentInsideModal: ModalContent.NONE,
  activeTask: null,
  activeBoard: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalAction>) => {
      state.isOpenModal = true;
      if (action.payload.type === 'task') {
        if (action.payload.action === 'addNewTask') {
          state.contentInsideModal = ModalContent.TASK_ADD;
          state.activeTask = null;
        } else {
          state.contentInsideModal = ModalContent.TASK_DETAILS;
          state.activeTask = action.payload.task;
        }
      } else if (action.payload.type === 'board') {
        if (action.payload.action === 'delete') {
          state.contentInsideModal = ModalContent.BOARD_DELETE;
          state.activeBoard = action.payload.board;
        } else {
          state.contentInsideModal = ModalContent.BOARD_EDIT;
          state.activeBoard = action.payload.board;
        }
      }
    },
    closeModal: (state) => {
      state.isOpenModal = false;
      state.contentInsideModal = ModalContent.NONE;
    },
    setView: (state, action: PayloadAction<ModalContent>) => {
      state.contentInsideModal = action.payload;
      console.log(state.contentInsideModal);
    },
  },
});

export const { openModal, closeModal, setView } = modalSlice.actions;
export const isOpenModal = (state: RootState): boolean =>
  state.modal.isOpenModal;
export const isDetailsTaskView = (state: RootState): boolean =>
  state.modal.contentInsideModal === ModalContent.TASK_DETAILS;
export const isEditTaskView = (state: RootState): boolean =>
  state.modal.contentInsideModal === ModalContent.TASK_EDIT;
export const isDeleteTaskView = (state: RootState): boolean =>
  state.modal.contentInsideModal === ModalContent.TASK_DELETE;
export const isAddTaskView = (state: RootState): boolean =>
  state.modal.contentInsideModal === ModalContent.TASK_ADD;
export const isEditBoardView = (state: RootState): boolean =>
  state.modal.contentInsideModal === ModalContent.BOARD_EDIT;
export const isDeleteBoardView = (state: RootState): boolean =>
  state.modal.contentInsideModal === ModalContent.BOARD_DELETE;
export const currentModalContent = (state: RootState): ModalContent =>
  state.modal.contentInsideModal;

export default modalSlice.reducer;
