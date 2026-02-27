// TODO: Añado solo la parte de dominio por que de momento el api va a usar el mismo
// luego veré si lo copio para tener las capas diferenciadas o lo mantengo justificando este motivo
export interface PhoneSpecs {
  screen: string;
  resolution: string;
  processor: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  os: string;
  screenRefreshRate: string;
}

export interface ColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

export interface StorageOption {
  capacity: string;
  price: number;
}

export interface PhoneListItem {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export interface PhoneDetail extends PhoneListItem {
  description: string;
  rating: number;
  specs: PhoneSpecs;
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
  similarPhones: PhoneListItem[];
}
