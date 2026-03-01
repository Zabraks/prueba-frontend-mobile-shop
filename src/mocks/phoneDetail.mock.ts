import { PhoneDetail } from '@/domain/phone/phone.types';

export const mockPhoneDetail: PhoneDetail = {
  id: 'SMG-A25',
  brand: 'Samsung',
  name: 'Galaxy A25 5G',
  description:
    'El Samsung Galaxy A25 5G es un smartphone de gama media con una pantalla FHD+ de 6.5 pulgadas, procesador Exynos 1280 Octa-Core, y una potente batería de 5000mAh, ofreciendo un rendimiento equilibrado y una experiencia 5G asequible.',
  basePrice: 239,
  rating: 4.3,
  specs: {
    screen: '6.5" FHD+',
    resolution: '1080 x 2340 pixels',
    processor: 'Samsung Exynos 1280 Octa-Core',
    mainCamera: '50 MP (F1.8) Principal, OIS + 8 MP (F2.2) Ultra gran angular + 2 MP (F2.4) Macro',
    selfieCamera: '13 MP',
    battery: '5000 mAh',
    os: 'Android 14',
    screenRefreshRate: '120 Hz',
  },
  colorOptions: [
    {
      name: 'Negro',
      hexCode: '#000000',
      imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-negro.webp',
    },
    {
      name: 'Azul',
      hexCode: '#0000FF',
      imageUrl: 'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-azul.webp',
    },
    {
      name: 'Amarillo',
      hexCode: '#FFFF00',
      imageUrl:
        'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A25-amarillo.webp',
    },
  ],
  storageOptions: [
    {
      capacity: '128 GB',
      price: 219,
    },
    {
      capacity: '256 GB',
      price: 239,
    },
  ],
  similarProducts: [
    {
      id: 'SMG-A35',
      brand: 'Samsung',
      name: 'Galaxy A35 5G',
      basePrice: 333,
      imageUrl:
        'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-A35-light-blue.webp',
    },
    {
      id: 'SMG-S23FE',
      brand: 'Samsung',
      name: 'Galaxy S23 FE',
      basePrice: 699,
      imageUrl:
        'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S23FE-purple.webp',
    },
    {
      id: 'XMI-13TPro',
      brand: 'XIAOMI',
      name: '13T Pro',
      basePrice: 553.31,
      imageUrl:
        'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/XMI-13TPro-negro.webp',
    },
    {
      id: 'XMI-RN13P5G',
      brand: 'Xiaomi',
      name: 'Redmi Note 13 Pro 5G',
      basePrice: 399,
      imageUrl:
        'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/XMI-RN13P5G-midnight-black.webp',
    },
    {
      id: 'OPP-A18',
      brand: 'OPPO',
      name: 'A18',
      basePrice: 99,
      imageUrl:
        'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/OPP-A18-azul-brillante.webp',
    },
    {
      id: 'SMG-S24U',
      brand: 'Samsung',
      name: 'Galaxy S24 Ultra',
      basePrice: 1329,
      imageUrl:
        'http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SMG-S24U-titanium-violet.webp',
    },
  ],
};
