import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

enum ModalContent {
  NONE = 'none',
  DETAILS = 'details',
  EDIT = 'edit',
  DELETE = 'delete',
  ADD = 'add',
}

const initialState = {
  isOpenModal: false,
  conntentInsideModal: ModalContent.NONE,
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
      state.conntentInsideModal = ModalContent.NONE;
    },
    setView: (state, action: PayloadAction<ModalContent>) => {
      state.conntentInsideModal = action.payload;
    },
  },
});

export const { openModal, closeModal, setView } = modalSlice.actions;
export const isOpenModal = (state: RootState): boolean =>
  state.modal.isOpenModal;
export const currentModalContent = (state: RootState): ModalContent =>
  state.modal.conntentInsideModal;

export default modalSlice.reducer;
