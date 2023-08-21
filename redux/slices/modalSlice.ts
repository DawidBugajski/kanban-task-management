import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Task } from '@/types';

export enum ModalContent {
  NONE = 'none',
  TASK_DETAILS = 'task_details',
  TASK_EDIT = 'task_edit',
  TASK_DELETE = 'task_delete',
  TASK_ADD = 'task_add',
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
    openModal: (state, action: PayloadAction<Task | null | 'addNewTask'>) => {
      state.isOpenModal = true;
      if (action.payload === 'addNewTask') {
        state.contentInsideModal = ModalContent.TASK_ADD;
        state.activeTask = null;
      } else {
        state.contentInsideModal = ModalContent.TASK_DETAILS;
        state.activeTask = action.payload;
      }
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
export const currentModalContent = (state: RootState): ModalContent =>
  state.modal.contentInsideModal;

export default modalSlice.reducer;
