export type Product = {
  name: string;
  color: string[];
  price: number;
  storage: string[];
  category: string;
  src: string;
};

export type ProductRespone = {
  products: Product[];
  maxPrice: number;
};

export type ProductSort = 'name' | 'priceAsc' | 'priceDesc';
