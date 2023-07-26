import React from 'react';
import './SidebarBoard.css';
import { Board } from '@/types';
import { useAppSelector } from '@/redux/hooks';
import { getBoards } from '@/redux/slices/boardsSlice';

export default function SidebarBoards() {
  const boards = useAppSelector(getBoards);

  const activeBoard = boards[0];

  return (
    <div className='w-[276px]'>
      <span className='ml-[34px] block mb-5 uppercase font-heading text-heading-s tracking-heading-s text-medium-grey'>
        all boards ({boards.length})
      </span>
      <ul className='font-heading text-heading-m text-medium-grey'>
        {boards.map(({ name }: Board, index: number) => (
          <li
            key={index}
            className={`group transition-colors duration-100 cursor-pointer overflow-hidden flex items-center h-12 rounded-tr-[100px] rounded-br-[100px] 
            ${index === 0 && 'bg-purple text-white'}
            ${
              index !== 0 && 'hover:bg-lightbg-hover-boards dark:hover:bg-white'
            }
            `}
          >
            <span
              className={`inline-flex items-center gap-4 ml-9 
            ${index !== 0 && ' group-hover:text-purple'}
            `}
            >
              <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z'
                  fill={` ${activeBoard ? '#fff' : '#828FA3'} `}
                />
              </svg>
              {name}
            </span>
          </li>
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