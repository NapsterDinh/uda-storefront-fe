import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Product } from "../../models/product";
import { ProductService } from "../../services/product.service";
import { ListItemComponent } from "../../components/list-item/list-item.component";

@Component({
  selector: "app-product-detail",
  standalone: true,
  imports: [CommonModule, RouterLink, ListItemComponent],
  templateUrl: "./product-detail.component.html",
})
export class ProductDetailComponent implements OnInit {
  item!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      let products: Product[] = [];
      (await this.productService.getAllProducts()).subscribe((res) => {
        products = res;
        const result = products.find((item) => item.id == params.get("id"));
        if (!result) {
          this.router.navigate([`/not-found`]);
          return;
        }
        this.item = result;
      });
    });
  }
}
