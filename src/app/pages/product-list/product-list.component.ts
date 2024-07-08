import { Component, OnInit } from "@angular/core";
import { Product } from "../../models/product";
import { ProductService } from "../../services/product.service";
import { ListItemComponent } from "../../components/list-item/list-item.component";

@Component({
  selector: "app-product-list",
  standalone: true,
  imports: [ListItemComponent],
  templateUrl: "./product-list.component.html",
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  async ngOnInit(): Promise<void> {
    (await this.productService.getAllProducts()).subscribe((res) => {
      this.products = res;
    });
  }
}
