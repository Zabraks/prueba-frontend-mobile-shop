import { Cart } from '@/features/cart/Cart';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Your shopping cart',
};

export default function CartPage() {
  return (
    <main>
      <Cart />
    </main>
  );
}
