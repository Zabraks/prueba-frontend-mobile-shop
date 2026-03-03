import type {
  PhoneListItem,
  PhoneDetail,
  PhoneSpecs,
  ColorOption,
  StorageOption,
} from '@/domain/phone/phone.types';
import type {
  ApiPhone,
  ApiPhoneDetail,
  ApiPhoneSpecs,
  ApiColorOption,
  ApiStorageOption,
} from './phone.api.types';

const mapSpecs = (apiSpecs: ApiPhoneSpecs): PhoneSpecs => ({
  screen: apiSpecs.screen,
  resolution: apiSpecs.resolution,
  processor: apiSpecs.processor,
  mainCamera: apiSpecs.mainCamera,
  selfieCamera: apiSpecs.selfieCamera,
  battery: apiSpecs.battery,
  os: apiSpecs.os,
  screenRefreshRate: apiSpecs.screenRefreshRate,
});

const mapColorOption = (apiColor: ApiColorOption): ColorOption => ({
  name: apiColor.name,
  hexCode: apiColor.hexCode,
  imageUrl: apiColor.imageUrl,
});

const mapStorageOption = (apiStorage: ApiStorageOption): StorageOption => ({
  capacity: apiStorage.capacity,
  price: apiStorage.price,
});

export const mapPhone = (apiPhone: ApiPhone): PhoneListItem => ({
  id: apiPhone.id,
  brand: apiPhone.brand,
  name: apiPhone.name,
  basePrice: apiPhone.basePrice,
  imageUrl: apiPhone.imageUrl,
});

export const mapPhoneDetail = (apiPhone: ApiPhoneDetail): PhoneDetail => ({
  ...mapPhone(apiPhone),
  description: apiPhone.description,
  rating: apiPhone.rating,
  specs: mapSpecs(apiPhone.specs),
  colorOptions: apiPhone.colorOptions.map(mapColorOption),
  storageOptions: apiPhone.storageOptions.map(mapStorageOption),
  similarProducts: apiPhone.similarProducts.map(mapPhone),
});
