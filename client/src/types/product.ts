export interface Product {
  id: string | number;
  name: string;
  brand?: string;
  price: number;
  originalPrice?: number;
  image: string;
  secondaryImage?: string;
  images?: string[];
  inStock?: boolean;
  isNewDrop?: boolean;
  category?: string;
  colorway?: string;
  colors?: string[];
  sizes?: (string | number)[];
  availableSizes?: (string | number)[];
  description?: string;
  details?: string[];
}
