import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Product } from "../../models/product";
import { CartService } from "../../services/cart.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-list-item",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./list-item.component.html",
  providers: [CartService],
})
export class ListItemComponent {
  @Input() item: Product;
  @Input() quantity: number = 1;
  @Input() showBackToHome = false;

  @Output() messageEvent = new EventEmitter<string>();

  constructor(private cartService: CartService) {
    this.item = {
      id: 0,
      image: "",
      price: 0,
      title: "",
    };
  }

  async handleAddToCart() {
    this.cartService.addToCart(this.item, this.quantity, false);
    this.messageEvent.emit("Add To Cart Success!!!");
  }

  inc(e: MouseEvent) {
    e.preventDefault();
    this.quantity += 1;
  }

  desc(e: MouseEvent) {
    e.preventDefault();
    if (this.quantity === 1) return;
    this.quantity -= 1;
  }
}
