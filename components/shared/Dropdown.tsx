import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Dropdown() {
  return (
    <Select>
      <SelectTrigger className='w-full text-body-l font-body-l'>
        <SelectValue placeholder='Theme' />
      </SelectTrigger>
      <SelectContent className=''>
        <SelectItem value='light'>Light</SelectItem>
        <SelectItem value='dark'>Dark</SelectItem>
        <SelectItem value='system'>System</SelectItem>
      </SelectContent>
    </Select>
  );
}
