'use client';

import { useEffect } from 'react';
import { ErrorView } from '@/features/layout/errorView/ErrorView';
import { ROUTES } from '@/config/routes';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CartError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorView
      section="cart"
      actions={[
        { action: 'tryAgain', onClick: reset },
        { action: 'continueShopping', href: ROUTES.phones },
      ]}
    />
  );
}
