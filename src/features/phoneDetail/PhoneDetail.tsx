'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type {
  PhoneDetail as PhoneDetailType,
  ColorOption,
  StorageOption,
} from '@/domain/phone/phone.types';
import type { CartItem } from '@/domain/cart/cart.types';
import { SimilarProducts } from '@/features/phoneDetail/SimilarProducts/SimilarProducts';
import { StorageSelector } from '@/features/phoneDetail/StorageSelector/StorageSelector';
import { ColorSelector } from '@/features/phoneDetail/ColorSelector/ColorSelector';
import { Button } from '@/ui/Button/Button';
import { ROUTES } from '@/config/routes';
import styles from './PhoneDetail.module.scss';
import { PHONE_DETAIL_STRINGS } from './constants';
import { useCartContext } from '@/context/CartContext/CartContext';
import { APP_CONFIG } from '@/config/app';

interface PhoneDetailProps {
  data: PhoneDetailType;
}

export const PhoneDetail = ({ data }: PhoneDetailProps) => {
  const { addItem } = useCartContext();

  const [currentOption, setCurrentOption] = useState<Omit<CartItem, 'id'>>({
    name: data.name,
    price: data.basePrice,
    img: data.colorOptions[0].imageUrl,
    selectedColor: data.colorOptions[0].name,
  });

  const handleColorChange = (option: ColorOption) => {
    setCurrentOption((prev) => ({
      ...prev,
      img: option.imageUrl,
      selectedColor: option.name,
    }));
  };

  const handleStorageChange = (storage: StorageOption) => {
    setCurrentOption((prev) => ({
      ...prev,
      selectedStorage: storage.capacity,
      price: storage.price,
    }));
  };

  const handleAddToCart = () => {
    if (!currentOption.selectedStorage || !currentOption.selectedColor) return;

    const newCartItem: CartItem = {
      ...currentOption,
      id: crypto.randomUUID(),
    };

    addItem(newCartItem);
  };

  const canAddToCart = useMemo(
    () => currentOption.selectedColor && currentOption.selectedStorage,
    [currentOption]
  );

  return (
    <div className={styles.wrapper}>
      <Link
        href={ROUTES.phones}
        className={styles.back}
        aria-label={PHONE_DETAIL_STRINGS.backAriaLabel}
      >
        <span>‹</span>
        {PHONE_DETAIL_STRINGS.back}
      </Link>
      <div className={styles.content}>
        <div className={styles.mainContent}>
          <div className={styles.imageWrapper}>
            <Image
              src={currentOption.img}
              alt={PHONE_DETAIL_STRINGS.imageAlt(data.name)}
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className={styles.image}
              priority
            />
          </div>
          <div className={styles.infoWrapper}>
            <div className={styles.info}>
              <h1 className={styles.name}>{data.name}</h1>
              <span className={styles.price}>
                {currentOption.price} {APP_CONFIG.currency}
              </span>
            </div>
            <div className={styles.selectors}>
              <div className={styles.section}>
                <p className={styles.sectionLabel}>{PHONE_DETAIL_STRINGS.storageLabel}</p>
                <StorageSelector
                  options={data.storageOptions}
                  selected={currentOption.selectedStorage}
                  onChange={handleStorageChange}
                />
              </div>

              <div className={styles.section}>
                <p className={styles.sectionLabel}>{PHONE_DETAIL_STRINGS.colorLabel}</p>
                <ColorSelector
                  colors={data.colorOptions}
                  selected={currentOption.selectedColor}
                  onChange={handleColorChange}
                />
              </div>
            </div>
            <Button
              fullWidth
              disabled={!canAddToCart}
              onClick={handleAddToCart}
              aria-label={
                canAddToCart
                  ? PHONE_DETAIL_STRINGS.addToCart(data.name)
                  : PHONE_DETAIL_STRINGS.addToCartDisabled
              }
            >
              {PHONE_DETAIL_STRINGS.addToCartButton}
            </Button>
          </div>
        </div>
        <div className={styles.additionalInfo}>
          <div className={styles.specs}>
            <h2 className={styles.title}>{PHONE_DETAIL_STRINGS.specsTitle}</h2>
            <dl className={styles.list}>
              {Object.entries(data.specs).map(([key, value]) => (
                <div key={key} className={styles.row}>
                  <dt className={styles.label}>{key}</dt>
                  <dd className={styles.value}>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <SimilarProducts phones={data.similarProducts} />
        </div>
      </div>
    </div>
  );
};
