import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {endPoints, URL_SEPARATOR} from "../model/constants";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpService: HttpService) {
  }

  searchProducts(params: any) {
    const endPoint = endPoints.products.concat(URL_SEPARATOR);
    return this.httpService.get(endPoint, params);
  }

  loadCategories() {
    const endPoint = endPoints.categories.concat(URL_SEPARATOR);
    return this.httpService.get(endPoint);
  }

  searchById(id: string) {
    const endPoint = endPoints.products.concat(URL_SEPARATOR).concat(id);
    return this.httpService.get(endPoint);
  }
}
