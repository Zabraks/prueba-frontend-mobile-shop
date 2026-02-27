import { PhoneListItem } from '@/domain/phone/phone.types';

export interface CartItem {
  phone: PhoneListItem;
  selectedColor: string;
  selectedStorage: string;
}
