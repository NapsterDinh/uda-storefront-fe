import { Routes } from "@angular/router";
import { CartComponent } from "./pages/cart/cart.component";
import { ProductListComponent } from "./pages/product-list/product-list.component";
import { OrderSuccessComponent } from "./pages/order/order.component";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import { NotfoundComponent } from "./pages/not-found/not-found.component";

export const routes: Routes = [
  {
    path: "",
    component: ProductListComponent,
    title: "Home",
  },
  {
    path: "products/:id",
    component: ProductDetailComponent,
    title: "Product detail",
  },
  {
    path: "cart",
    component: CartComponent,
    title: "Cart",
  },
  {
    path: "success/:orderCode",
    component: OrderSuccessComponent,
    title: "Place an order success",
  },
  {
    path: "**",
    component: NotfoundComponent,
    title: "404",
  },
];
