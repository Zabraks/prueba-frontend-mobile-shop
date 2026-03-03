import type { Metadata } from 'next';
import { CartProvider } from '@/context/CartContext/CartContext';
import { QueryProvider } from '@/context/QueryProvider';
import { Navbar } from '@/features/layout/Navbar/Navbar';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mbst.com'),
  title: {
    default: 'MBST',
    template: '%s | MBST',
  },
  description:
    'MBST is your go-to destination for the latest mobile phones. Browse our catalog, compare specs, and find the perfect smartphone at the best price.',
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
