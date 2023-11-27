export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  reting: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  message:string
};

export type ProductResponse = {
  limit: number;
  skip: number;
  total: number;
  products: Product[];
};

export type ProductCategoriesResponse = string[];
