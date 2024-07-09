import { Component, OnInit } from "@angular/core";
import { FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { CartItem } from "../../models/cart";
import { Product } from "../../models/product";
import { CartService } from "../../services/cart.service";
import { CommonModule } from "@angular/common";
import { User } from "../../models/user";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  cart: {
    [key: number]: CartItem;
  } = {};
  cartArr: CartItem[] = [];
  total: number = 0;

  user: User = {
    fullName: "",
    address: "",
    creditCardNumber: "",
  };

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.fetchCart();
  }

  async fetchCart() {
    const cart = await this.cartService.getCart();
    this.cart = cart;
    this.cartArr = Object.entries(this.cart).reduce((prev, cur) => {
      return prev.concat(cur[1]);
    }, [] as CartItem[]);

    this.total =
      Object.entries(this.cart).reduce((prev, cur) => {
        return (prev += cur[1].quantity * cur[1].product.price);
      }, 0) ?? 0;
  }

  async handleChangeProductQuantity(product: Product, newQuantity: number) {
    await this.cartService.adjustCartItem(product, newQuantity);
    this.fetchCart();
  }

  async handleRemoveProductFromCart(product: Product) {
    await this.cartService.removeFromCart(product);
    this.fetchCart();
  }

  placeOrder(form: NgForm): void {
    if (!form.valid) {
      form.control.markAllAsTouched();
      return;
    }

    this.cartService.clearCart();
    const orderCode = Date.now().toString();
    this.router.navigate([`/success/${orderCode}`]);
  }

  onQuantityKeyPress(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
}
