'use client';

import { useEffect } from 'react';
import { ErrorView } from '@/features//layout/errorView/ErrorView';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PhonesError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorView section="phones" actions={[{ action: 'tryAgain', onClick: reset }]} />;
}
