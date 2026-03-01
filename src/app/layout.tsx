import type { Metadata } from 'next';
import { CartProvider } from '@/context/CartContext/CartContext';
import { QueryProvider } from '@/context/QueryProvider';
import { Navbar } from '@/features/layout/Navbar/Navbar';
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
        <QueryProvider>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
