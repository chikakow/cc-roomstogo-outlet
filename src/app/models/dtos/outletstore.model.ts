import {ImageDto} from './image.model';

export class OutletStoreDto {
  state: string;
  locations: Array<StoreLocationDto>;
}

export class StoreLocationDto {
  id: number;
  name: string;
  street1: string;
  street2: string;
  city: string;
  state_abbreviation: string;
  state: string;
  zip_code: string;
  only_address_for_coord: boolean;
  phone: string;
  store_desc: string;
  neighborhoods
  holidays: string;
  store_hours: StoreHoursDto;
  store_image: ImageDto;
}

export class StoreHoursDto {
  sun: StoreOpenCloseDto;
  mon: StoreOpenCloseDto;
  tue: StoreOpenCloseDto;
  wed: StoreOpenCloseDto;
  thu: StoreOpenCloseDto;
  fri: StoreOpenCloseDto;
  sat: StoreOpenCloseDto;
}

export class StoreOpenCloseDto {
  from: string;
  to: string;
}
