import type { Metadata } from 'next';
import { QueryProvider } from '@/context/QueryProvider';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Mobile Shop',
  description: 'Mobile shop built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
