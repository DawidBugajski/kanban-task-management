import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export function useToggleTheme() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isToggled, setIsToggled] = useState(resolvedTheme === 'dark');

  useEffect(() => {
    setIsToggled(resolvedTheme === 'dark');
  }, [resolvedTheme]);

  const toggleTheme = () => {
    if (
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setTheme('light');
      setIsToggled(false);
    } else {
      setTheme('dark');
      setIsToggled(true);
    }
  };

  return { isToggled, toggleTheme };
}
