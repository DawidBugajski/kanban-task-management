import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Task } from '@/types';

export enum ModalContent {
  NONE = 'none',
  DETAILS = 'details',
  EDIT = 'edit',
  DELETE = 'delete',
  ADD = 'add',
}

interface ModalState {
  isOpenModal: boolean;
  contentInsideModal: ModalContent;
  activeTask: Task | null;
}

const initialState: ModalState = {
  isOpenModal: false,
  contentInsideModal: ModalContent.NONE,
  activeTask: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<Task | null>) => {
      state.isOpenModal = true;
      state.contentInsideModal = ModalContent.DETAILS;
      state.activeTask = action.payload;
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
  state.modal.contentInsideModal === ModalContent.DETAILS;
export const isEditTaskView = (state: RootState): boolean =>
  state.modal.contentInsideModal === ModalContent.EDIT;
export const isDeleteTaskView = (state: RootState): boolean =>
  state.modal.contentInsideModal === ModalContent.DELETE;
export const isAddTaskView = (state: RootState): boolean =>
  state.modal.contentInsideModal === ModalContent.ADD;
export const currentModalContent = (state: RootState): ModalContent =>
  state.modal.contentInsideModal;

export default modalSlice.reducer;
