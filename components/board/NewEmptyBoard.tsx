import { useAppSelector } from '@/redux/hooks';
import { getActiveBoard, getBoards } from '@/redux/slices/boardsSlice';
import React from 'react';

export default function NewEmptyBoard() {
  const activeBoard = useAppSelector(getActiveBoard);
  const boards = useAppSelector(getBoards);
  console.log(activeBoard, boards);

  return <p>This board is empty. Create a new column to get started.</p>;
}
