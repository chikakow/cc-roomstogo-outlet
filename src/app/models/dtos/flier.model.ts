import {PageContentDto, PageDto} from './page.model';
import {ImageDto} from './image.model';

export class CityFlier {
  city: string; // key
  state: string;
  contentWeekly: FlierContentDto;
  contentMattress: FlierContentDto;
}

export class FlierDto extends PageDto {
  content: FlierContentDto;
}

export class FlierContentDto extends PageContentDto {
  title: string;
  state: string;
  images: Array<FlierImageDto>;
}

export class FlierImageDto extends ImageDto {
  state: string;
}
