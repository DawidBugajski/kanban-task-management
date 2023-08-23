import { useState } from 'react';

export function useBoardTitle(initialTitle: string) {
  const [title, setTitle] = useState(initialTitle);

  const handleTitleChange = (newTitle: string) => setTitle(newTitle);
  return { title, setTitle, handleTitleChange };
}
