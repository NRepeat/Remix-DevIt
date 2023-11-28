export type DummyProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
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
  products: DummyProduct[];
};

export type ProductCategoriesResponse = string[];
