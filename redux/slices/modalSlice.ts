import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum ModalContent {
  NONE = 'none',
  DETAILS = 'details',
  EDIT = 'edit',
  DELETE = 'delete',
  ADD = 'add',
}

const initialState = {
  isOpenModal: false,
  contentInsideModal: ModalContent.NONE,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpenModal = true;
      state.contentInsideModal = ModalContent.DETAILS;
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
