import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { CartItem } from "../models/cart";
import { Product } from "../models/product";
import { isPlatformBrowser } from "@angular/common";

@Injectable({ providedIn: "root" })
export class CartService {
  storage;

  constructor(@Inject(PLATFORM_ID) private platformId: string | number) {
    if (isPlatformBrowser(this.platformId)) {
      this.storage = window.localStorage;
    }
  }

  async getCart(): Promise<{ [key: number]: CartItem }> {
    return JSON.parse(this.storage?.getItem("cart") || "{}");
  }

  async setCart(cart: { [key: number]: CartItem }) {
    return this.storage?.setItem("cart", JSON.stringify(cart));
  }

  async clearCart() {
    return this.storage?.setItem("cart", "{}");
  }

  async addToCart(product: Product, quantity: number, showAlert = true) {
    const cart = await this.getCart();
    await this.setCart({
      ...cart,
      [product.id]: {
        id: product.id,
        product,
        quantity: (cart?.[product.id as number]?.quantity ?? 0) + quantity,
      },
    });
    if (showAlert) alert("Add item to cart successfully!!!");
  }

  async removeFromCart(product: Product) {
    const cart = await this.getCart();
    delete cart[product.id as number];
    await this.setCart(cart);
    alert("Remove item from cart successfully!!!");
  }

  async adjustCartItem(product: Product, quantity: number) {
    const cart = await this.getCart();
    await this.setCart({
      ...cart,
      [product.id]: {
        id: product.id,
        product,
        quantity: quantity <= 1 ? 1 : quantity,
      },
    });
  }

  async getCartItem(product: Product) {
    const cart = await this.getCart();
    return cart[product.id as number];
  }
}
