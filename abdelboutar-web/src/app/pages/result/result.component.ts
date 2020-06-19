import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EsResponse} from "../../model/es-response";
import {Product} from "../../model/product";
import {ProductService} from "../../services/product.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  public products: Product[] = [];
  public categories: any[] = [];
  public subCategories: any[] = [];
  public searchForm: FormGroup;
  rating = Array;
  public product: Product;
  private id: string;

  constructor(private actRoute: ActivatedRoute, private service: ProductService) {
  }

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.queryParamMap.get('id');
    this.searchForm = new FormGroup({
      name: new FormControl('', []),
      category: new FormControl('', []),
      subCategory: new FormControl('', []),
    });
    this.loadCategories();
    this.searchById(this.id);
  }

  setSubCategory() {
    let filter: any = this.categories.filter(value => value.id === +this.searchForm.value.category)[0];
    this.subCategories = filter.subCategories;
  }

  searchProducts() {

  }

  private loadCategories() {
    this.service.loadCategories().subscribe((res: EsResponse) => {
      this.categories = res.data;

    }, error => {
      console.log(error);
    });
  }

  private searchById(id: string) {
    this.service.searchById(id).subscribe((res: EsResponse) => {
      console.log(res)
      this.product = res.data;
    })
  }
}
