import React from 'react';

type ButtonProps = {
  title: string;
  className: string;
  disabled?: boolean;
  onClick: () => void;
};

export default function Button({ title, className, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={className}>
      {title}
    </button>
  );
}
