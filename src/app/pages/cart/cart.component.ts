import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { CartItem } from "../../models/cart";
import { Product } from "../../models/product";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  cart: {
    [key: number]: CartItem;
  } = {};
  cartArr: CartItem[] = [];
  total: number = 0;

  validateForm: FormGroup<{
    fullName: FormControl<string>;
    address: FormControl<string>;
    creditCardNumber: FormControl<string>;
  }> = this.fb.group({
    fullName: ["", [Validators.required]],
    address: ["", [Validators.required]],
    creditCardNumber: ["", [Validators.required]],
  });

  constructor(
    private fb: NonNullableFormBuilder,
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

  placeOrder(): void {
    console.log(this.validateForm);

    if (this.validateForm.valid) {
      this.cartService.clearCart();
      const orderCode = Date.now().toString();
      this.router.navigate([`/success/${orderCode}`]);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
