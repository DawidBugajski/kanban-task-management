import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '../shared/Button';
import { ICON_CROSS_SVG } from '@/constans';
import Image from 'next/image';
import { useBoardValidationErrors } from '@/hooks/useBoardValidationErrors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addBoard,
  addColumn,
  deleteColumn,
  getActiveBoard,
  updateBoardTitle,
  updateColumnName,
} from '@/redux/slices/boardsSlice';
import { useBoardTitle } from '@/hooks/useBoardTitle';
import { useBoardColumns } from '@/hooks/useBoardColumns';
import { useCloseModal } from '@/hooks/useCloseModal';
import { Task, Column } from '@/types';

type ContextType = 'Edit Board' | 'Add Board';

interface BoardForm {
  context: ContextType;
}

export default function BoardForm({ context }: BoardForm) {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(getActiveBoard);
  const handleCloseModal = useCloseModal();
  const { columns } = activeBoard;
  const { validationErrors, validateChanges } = useBoardValidationErrors({
    title: false,
    columns: Array(columns.length).fill(false),
  });
  // const CreateNewBoardDefaultColumn: Column[] = [
  //   { id: uuidv4(), name: 'Todo', tasks: [] as Task[] },
  //   { id: uuidv4(), name: 'Doing', tasks: [] as Task[] },
  //   { id: uuidv4(), name: 'Done', tasks: [] as Task[] },
  // ];
  const { title, handleTitleChange } = useBoardTitle(
    context === 'Add Board' ? '' : activeBoard?.name || ''
  );

  const {
    localColumns,
    handleAddColumn,
    handleDeleteColumn,
    handleColumnNameChange,
    lastInputRef,
  } = useBoardColumns(context === 'Add Board' ? [] : columns);

  const handleSaveChanges = () => {
    if (!validateChanges(title, localColumns)) return;

    if (activeBoard) {
      dispatch(updateBoardTitle({ title }));

      columns.forEach((column) => {
        if (!localColumns.some((localColumn) => localColumn.id === column.id)) {
          dispatch(deleteColumn({ columnId: column.id }));
        }
      });

      localColumns.forEach((localColumn) => {
        if (!columns.some((column) => column.id === localColumn.id)) {
          dispatch(addColumn({ column: localColumn }));
        } else {
          dispatch(
            updateColumnName({
              columnId: localColumn.id,
              name: localColumn.name,
            })
          );
        }
      });
    }

    handleCloseModal();
  };

  const handleAddNewBoard = () => {
    if (!validateChanges(title, localColumns)) return;
    const newBoard = {
      id: uuidv4(),
      name: title,
      columns: localColumns,
    };
    dispatch(addBoard(newBoard));
    handleCloseModal();
  };

  const handleButtonClick = () => {
    const actions = {
      'Edit Board': handleSaveChanges,
      'Add Board': handleAddNewBoard,
    };

    const action = actions[context];
    if (action) {
      action();
    }
  };

  return (
    <div className='relative flex flex-col h-auto gap-6 p-6 md:p-8'>
      <h2 className='text-heading-l font-heading'>
        {context === 'Edit Board' ? 'Edit Board' : 'Add New Board'}
      </h2>
      <div className='flex flex-col gap-2'>
        <p className='text-body-m text-medium-grey font-body-m'>Board name</p>
        <input
          className={`${
            validationErrors.title
              ? 'placeholder:text-red placeholder:text-right outline outline-1 outline-red focus-visible:outline-purple border border-transparent'
              : 'border border-opacity-25 border-slate-400 focus-visible:outline focus-visible:outline-purple'
          } dark:bg-transparent text-[13px] font-medium leading-6 w-full py-2 px-4 rounded `}
          value={title}
          type='text'
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder={
            validationErrors.title ? "Can't be empty!" : 'e.g. Backend Tasks'
          }
        />
      </div>
      <div className='flex flex-col justify-between w-full gap-3 max-h-[25vh] overflow-y-auto py-0.5'>
        {localColumns.map((column, index) => (
          <div className='flex' key={column.id}>
            <input
              ref={index === localColumns.length - 1 ? lastInputRef : null}
              className={`${
                validationErrors.columns[index]
                  ? 'border-red border-opacity-100 placeholder:text-red placeholder:text-right'
                  : 'border-slate-400 focus-visible:outline-none border-opacity-25'
              }  dark:bg-transparent text-[13px] font-medium leading-6 py-2 px-4 border outline-none rounded w-[93%] focus-visible:border-purple `}
              value={column.name}
              type='text'
              onChange={(e) => handleColumnNameChange(index, e.target.value)}
              placeholder={
                validationErrors.columns[index]
                  ? "Can't be empty!"
                  : 'New subtask'
              }
            />
            <Button
              onClick={() => handleDeleteColumn(column.id)}
              className='mx-auto shrink-0'
            >
              <Image
                src={ICON_CROSS_SVG}
                alt='icon cross'
                width={15}
                height={15}
              />
            </Button>
          </div>
        ))}
      </div>
      <Button
        onClick={handleAddColumn}
        className='transition-colors duration-100 hover:bg-[#d8d7f1] text-body-l font-bold bg-[#f0effa] py-2 text-center text-purple rounded-[20px] grow'
      >
        +Add New Column
      </Button>
      <Button
        onClick={handleButtonClick}
        className='transition-colors duration-100 hover:bg-purple-hover text-body-l font-bold bg-purple py-2 text-center text-white rounded-[20px] grow'
      >
        {context === 'Edit Board' ? 'Save Changes' : 'Create New Board'}
      </Button>
    </div>
  );
}
