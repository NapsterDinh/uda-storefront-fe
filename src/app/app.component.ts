import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, RouterOutlet } from "@angular/router";
import { FlowBiteService } from "./services/flowbite.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterModule, FormsModule],
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  title = "Uda Storefront";
  navbarItems: any[] = [
    {
      path: "",
      title: "Home",
    },
    { path: "cart", title: "Cart" },
  ];
  constructor(private flowBiteService: FlowBiteService) {}

  ngOnInit(): void {
    this.flowBiteService.loadFlowBite((flowBite) => {
      // Your custom code here
      console.log("FlowBite loaded", flowBite);
    });
  }
}
