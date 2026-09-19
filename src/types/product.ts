export type ProductCategory = 'home' | 'carry' | 'ritual';

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  image: string;
  alt: string;
  tag?: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}
