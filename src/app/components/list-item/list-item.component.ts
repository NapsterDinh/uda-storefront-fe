import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { CartItem } from "../../models/cart";
import { CartService } from "../../services/cart.service";
import { Product } from "../../models/product";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-list-item",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./list-item.component.html",
  providers: [CartService],
})
export class ListItemComponent {
  @Input() item: Product;
  quantity: number = 1;

  constructor(private cartService: CartService) {
    this.item = {
      id: 0,
      image: "",
      price: 0,
      title: "",
    };
  }

  addToCart() {}

  inc() {
    this.quantity++;
  }

  desc() {
    this.quantity--;
  }
}
