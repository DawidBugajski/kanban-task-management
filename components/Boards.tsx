import React from 'react';
import data from '../data.json';
import { Board } from '@/types';
export default function Boards() {
  return (
    <div className='w-[276px]'>
      <span className='ml-[34px] block mb-5 uppercase font-heading text-heading-s tracking-heading-s text-medium-grey'>
        all boards (3)
      </span>
      <ul className='font-heading text-heading-m text-medium-grey'>
        {data.boards.map(({ name }: Board, index: number) => (
          <li
            key={index}
            className={`group hover:bg-[#E9EFFA] transition-colors duration-100 cursor-pointer overflow-hidden flex items-center h-12 rounded-tr-[100px] rounded-br-[100px] ${
              index === 0 && 'bg-purple text-white'
            }`}
          >
            <span className='inline-flex items-center gap-4 ml-9 group-hover:text-purple'>
              <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z'
                  fill={` ${index === 0 ? '#fff' : '#828FA3'} `}
                />
              </svg>
              {name}
            </span>
          </li>
        ))}
        <div className='inline-flex items-center h-12 gap-4 ml-[34px]'>
          <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z'
              fill='#635FC7'
            />
          </svg>
          <p className='text-purple font-heading text-heading-m'>
            +Create New Board
          </p>
        </div>
      </ul>
    </div>
  );
}
