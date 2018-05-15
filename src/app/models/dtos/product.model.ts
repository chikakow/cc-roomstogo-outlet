export class CategoryDto {
  name: string;
  products: Array<ProductDto>;
}

export class ProductDto {
  id: string;
  sku: string;
  category: string;
  description: string;
  title: string;
  price: number;
  available: number;
  product_url: string;
  image_url: string;
  company: string;
  category_hierarchy: string;
  brand: string;
}
