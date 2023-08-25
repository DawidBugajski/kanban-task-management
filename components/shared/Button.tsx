import React from 'react';

type ButtonProps = {
  title?: string;
  className: string;
  disabled?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
};

export default function Button({
  title,
  className,
  onClick,
  children,
  disabled,
}: ButtonProps) {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {title && <span>{title}</span>}
      {children}
    </button>
  );
}
