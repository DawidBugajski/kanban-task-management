import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
  const isMobileOrDesktop = useMediaQuery({
    query: '(min-width: 768px)',
  });

  const isTabletOrDesktop = useMediaQuery({
    query: '(min-width: 1280px)',
  });

  // true if >= 768px
  // true if >= 1280px

  return { isMobileOrDesktop, isTabletOrDesktop };
};
