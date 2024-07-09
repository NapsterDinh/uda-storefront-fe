import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
  selector: "app-order-success",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./order.component.html",
})
export class OrderSuccessComponent implements OnInit {
  orderCode: string = "";

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.orderCode = params.get("orderCode") ?? "";
    });
  }
}
