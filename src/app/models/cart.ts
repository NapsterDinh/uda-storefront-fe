import { Product } from "./product";

export interface CartItem {
  id: string | number;
  product: Product;
  quantity: number;
}
