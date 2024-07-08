import { Routes } from "@angular/router";
import { ProductListComponent } from "./pages/product-list/product-list.component";

export const routes: Routes = [
  {
    path: "",
    component: ProductListComponent,
    title: "Home",
  },
  {
    path: "products/:id",
    component: ProductListComponent,
    title: "Product detail",
  },
  {
    path: "cart",
    component: ProductListComponent,
    title: "Cart",
  },
  {
    path: "success/:orderCode",
    component: ProductListComponent,
    title: "Place an order success",
  },
];
