'use client';

import { useEffect } from 'react';
import { ErrorView } from '@/features/errorView/ErrorView';
import { ROUTES } from '@/config/routes';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PhoneDetailError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorView
      section="phoneDetail"
      actions={[
        { action: 'tryAgain', onClick: reset },
        { action: 'goBack', href: ROUTES.phones },
      ]}
    />
  );
}
