import { useState } from 'react';

export function useTitleAndDescription(
  initialTitle: string,
  initialDescription: string
) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleTitleChange = (newTitle: string) => setTitle(newTitle);
  const handleDescriptionChange = (newDescription: string) =>
    setDescription(newDescription);

  return { title, description, handleTitleChange, handleDescriptionChange };
}
