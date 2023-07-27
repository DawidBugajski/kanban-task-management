import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
  const isMobileOrDesktop = useMediaQuery({
    query: '(min-width: 768px)',
  });
  // true if >= 768px

  return { isMobileOrDesktop };
};
