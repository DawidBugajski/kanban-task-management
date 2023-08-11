import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum ModalContent {
  DETAILS = 'details',
  EDIT = 'edit',
  DELETE = 'delete',
  ADD = 'add',
}

const initialState = {
  isOpenModal: false,
  conntentInsideModal: ModalContent.DETAILS,
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
    },
    setView: (state, action: PayloadAction<ModalContent>) => {
      state.conntentInsideModal = action.payload;
    },
  },
});

export const { openModal, closeModal, setView } = modalSlice.actions;
export const isOpenModal = (state: RootState): boolean =>
  state.modal.isOpenModal;
export const isDetailsTaskView = (state: RootState): boolean =>
  state.modal.conntentInsideModal === ModalContent.DETAILS;
export const isEditTaskView = (state: RootState): boolean =>
  state.modal.conntentInsideModal === ModalContent.EDIT;
export const isDeleteTaskView = (state: RootState): boolean =>
  state.modal.conntentInsideModal === ModalContent.DELETE;
export const isAddTaskView = (state: RootState): boolean =>
  state.modal.conntentInsideModal === ModalContent.ADD;
export const currentModalContent = (state: RootState): ModalContent =>
  state.modal.conntentInsideModal;

export default modalSlice.reducer;
