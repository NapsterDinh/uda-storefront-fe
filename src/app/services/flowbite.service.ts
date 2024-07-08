import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class FlowBiteService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  loadFlowBite(callback: (flowBite: any) => void) {
    if (isPlatformBrowser(this.platformId)) {
      import("flowbite").then((flowBite) => {
        callback(flowBite);
      });
    }
  }
}
