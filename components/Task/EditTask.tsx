import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addSubtask,
  deleteSubtask,
  getActiveBoard,
  getActiveTask,
  moveTaskToColumn,
  updateSubtaskTitles,
  updateTaskDescription,
  updateTaskTitle,
} from '@/redux/slices/boardsSlice';
import { ICON_CROSS_SVG } from '@/constans';
import Image from 'next/image';
import Button from '../shared/Button';
import Dropdown from '../shared/Dropdown';
import { useTitleAndDescription } from '@/hooks/useTaskTitleAndDescription';
import { useTaskSubtasks } from '@/hooks/useTaskSubtasks';
import { useSelectedColumn } from '@/hooks/useTaskSelectedColumn';
import { useValidationErrors } from '@/hooks/useTaskValidationErrors';
import { useCloseModal } from '@/hooks/useCloseModal';
import { Form } from '../shared/Form';

export function EditTask() {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(getActiveBoard);
  const activeTask = useAppSelector(getActiveTask);
  const { columns: activeBoardColumns } = activeBoard;
  const { subtasks = [] } = activeTask || {};
  const currentColumnForTask = activeBoard.columns.find((column) =>
    column.tasks.some((task) => task.id === activeTask?.id)
  );

  const { title, description, handleTitleChange, handleDescriptionChange } =
    useTitleAndDescription(
      activeTask?.title || 'enter title',
      activeTask?.description || ''
    );

  const {
    localSubtasks,
    handleAddSubtask,
    handleDeleteSubtask,
    handleSubtaskTitleChange,
    lastInputRef,
  } = useTaskSubtasks(subtasks);

  const { selectedColumn, handleColumnChange } = useSelectedColumn(
    currentColumnForTask?.id || null
  );

  const { validationErrors, validateChanges } = useValidationErrors({
    title: false,
    subtasks: Array(subtasks.length).fill(false),
  });

  const handleCloseModal = useCloseModal();

  const handleSaveChanges = () => {
    if (!validateChanges(title, localSubtasks)) return;

    if (activeTask && selectedColumn) {
      dispatch(
        moveTaskToColumn({ taskId: activeTask.id, newColumnId: selectedColumn })
      );
      dispatch(updateTaskTitle({ taskId: activeTask.id, title }));
      dispatch(
        updateTaskDescription({
          taskId: activeTask.id,
          description: description,
        })
      );

      subtasks.forEach((subtask) => {
        if (!localSubtasks.some((task) => task.id === subtask.id)) {
          dispatch(deleteSubtask({ subtaskId: subtask.id }));
        }
      });

      localSubtasks.forEach((localSubtask) => {
        if (!subtasks.some((subtask) => subtask.id === localSubtask.id)) {
          dispatch(
            addSubtask({ taskId: activeTask.id, subtask: localSubtask })
          );
        }
      });

      dispatch(
        updateSubtaskTitles({ taskId: activeTask.id, subtasks: localSubtasks })
      );
    }
    handleCloseModal();
  };

  return (
    <>
      <Form context='Edit Task' />
    </>
  );
}
