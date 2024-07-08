import { Injectable } from "@angular/core";
import { CartItem } from "../models/cart";

@Injectable({ providedIn: "root" })
export class CartService {
  async addToCart(cartItem: Omit<CartItem, "id"> & { id?: string | number }) {}
}
