'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useIsFetching } from '@tanstack/react-query';

export const useNavigationProgress = () => {
  const pathname = usePathname();
  const isFetching = useIsFetching();
  const [isLoading, setIsLoading] = useState(false);
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      queueMicrotask(() => setIsLoading(true));
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return isLoading || isFetching > 0;
};
