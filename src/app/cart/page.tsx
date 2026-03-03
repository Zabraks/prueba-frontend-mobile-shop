import { Cart } from '@/features/cart/Cart';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart',
  description:
    'Review your shopping cart, manage selected items and proceed to checkout. Your cart is saved locally for convenience.',
};

export default function CartPage() {
  return (
    <main>
      <Cart />
    </main>
  );
}
