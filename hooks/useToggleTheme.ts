import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export function useToggleTheme() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isToggled, setIsToggled] = useState(resolvedTheme === 'dark');

  useEffect(() => {
    setIsToggled(resolvedTheme === 'dark');
  }, [resolvedTheme]);

  const toggleTheme = () => {
    setIsToggled(!isToggled);
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return { isToggled, toggleTheme };
}
