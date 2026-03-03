export interface FetchPhonesListParams {
  search?: string;
  limit?: number;
  offset?: number;
}

export interface ApiPhone {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export interface ApiPhoneSpecs {
  screen: string;
  resolution: string;
  processor: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  os: string;
  screenRefreshRate: string;
}

export interface ApiColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

export interface ApiStorageOption {
  capacity: string;
  price: number;
}

export interface ApiPhoneDetail extends ApiPhone {
  description: string;
  rating: number;
  specs: ApiPhoneSpecs;
  colorOptions: ApiColorOption[];
  storageOptions: ApiStorageOption[];
  similarProducts: ApiPhone[];
}
