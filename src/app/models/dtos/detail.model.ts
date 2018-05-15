import {ImageDto} from './image.model';
import {PageContentDto, PageDto} from './page.model';
import {ProductDto} from './product.model';


export class DetailDto extends PageDto {
  content: DetailContentDto;
}

export class DetailContentDto extends PageContentDto {
  details: Array<string>;
  mainImage: ImageDto;
  products: Array<ProductDto>;
  // index 0 for desktop, 1 for mobile
  bannerImages: Array<ImageDto>;
  categoryHierarchy: string;
}



