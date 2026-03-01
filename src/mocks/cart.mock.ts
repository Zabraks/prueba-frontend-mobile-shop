import { CartItem } from '@/domain/cart/cart.types';

export const mockCart: CartItem[] = [
  {
    name: 'Pixel 8a',
    price: 459,
    img: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/GPX-8A-obsidiana.webp',
    selectedColor: 'Obsidiana',
    selectedStorage: '128 GB',
    id: 'ca933f4d-e274-4733-af86-1ba3b6cb681d',
  },
  {
    name: 'Reno 11 F',
    price: 269,
    img: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/OPP-R11F-azul.webp',
    selectedColor: 'Azul',
    selectedStorage: '256 GB',
    id: 'f27fd387-3a76-4d88-90d5-4bfc4483fb4e',
  },
];
