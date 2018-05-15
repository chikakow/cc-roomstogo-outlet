import {ImageDto} from './image.model';

export class PageDto {
  routerUrl: string;
  content: PageContentDto;
}

export class PageContentDto {
  title: string;
  images: Array<ImageDto>;
}

