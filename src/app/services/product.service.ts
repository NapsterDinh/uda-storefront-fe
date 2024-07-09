import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiUrl } from "../constants";
import { Product } from "../models/product";

@Injectable({ providedIn: "root" })
export class ProductService {
  constructor(private http: HttpClient) {}
  async getAllProducts() {
    return await this.http.get<Product[]>(apiUrl);
  }
}
