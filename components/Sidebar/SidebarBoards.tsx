import React from 'react';
import { Board } from '@/types';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {
  getBoards,
  getActiveBoard,
  setActiveBoard,
} from '@/redux/slices/boardsSlice';

export default function SidebarBoards() {
  const boards = useAppSelector(getBoards);

  return (
    <div className='w-[89%]'>
      <span className='ml-[34px] mt-[15px] block mb-5 uppercase font-heading text-heading-s tracking-heading-s text-medium-grey'>
        all boards ({boards.length})
      </span>
      <ul className='font-heading text-heading-m text-medium-grey'>
        {boards.map((board) => (
          <BoardItem key={board.id} board={board} />
        ))}
        <li className='text-purple dark:hover:bg-white hover:bg-lightbg-hover-boards rounded-tr-[100px] rounded-br-[100px] transition-colors duration-100 cursor-pointer'>
          <span className='inline-flex items-center h-12 gap-4 ml-9'>
            <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z'
                fill='#635FC7'
              />
            </svg>
            +Create New Board
          </span>
        </li>
      </ul>
    </div>
  );
}

const BoardItem = ({ board }: { board: Board }) => {
  const dispatch = useAppDispatch();
  const activeBoard = useAppSelector(getActiveBoard);
  const isActiveBoard = activeBoard.id === board.id;
  const handleSetActiveBoard = () => dispatch(setActiveBoard(board.id));
  const { id, name } = board;

  return (
    <li
      onClick={handleSetActiveBoard}
      key={id}
      className={`group transition-colors duration-100 cursor-pointer overflow-hidden flex items-center h-12 rounded-tr-[100px] rounded-br-[100px] 
      ${isActiveBoard ? 'bg-purple text-white' : ''}
      ${!isActiveBoard && 'hover:bg-lightbg-hover-boards dark:hover:bg-white'}
      `}
    >
      <span
        className={`inline-flex items-center gap-4 ml-9 
      ${!isActiveBoard && ' group-hover:text-purple'}
      `}
      >
        <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z'
            className='fill-current'
          />
        </svg>
        {name}
      </span>
    </li>
  );
};
