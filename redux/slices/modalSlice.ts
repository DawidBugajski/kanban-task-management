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
    openModal: (state) => {
      state.isOpenModal = true;
    },
    closeModal: (state) => {
      state.isOpenModal = false;
      state.contentInsideModal = ModalContent.NONE;
    },
    setView: (state, action: PayloadAction<ModalContent>) => {
      state.contentInsideModal = action.payload;
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
