import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {FormControl, FormGroup} from "@angular/forms";
import {EsResponse} from "../../model/es-response";
import {Product} from "../../model/product";

declare var $: any;

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})
export class ConsoleComponent implements OnInit {
  searchForm: FormGroup;
  public products: Product[] = [];
  public categories: any[] = [];
  public subCategories: any[] = [];
  rating = Array;
  public totalPagesArr: number[] = [];
  itemsPerPage: string | number = 10;
  page: string | number = 1;

  constructor(private service: ProductService) {
  }

  ngOnInit(): void {
    var self = this;
    $("#range").ionRangeSlider({
      type: "double",
      grid: true,
      min: 0,
      max: 10000,
      from: 10,
      to: 5000,
      prefix: "£",
      onChange: function (data) {
        self.searchForm.patchValue({
          priceFrom: data.from,
          priceTo: data.to
        });
        self.searchProducts();
      }
    });

    this.searchForm = new FormGroup({
      name: new FormControl('', []),
      category: new FormControl('', []),
      subCategory: new FormControl('', []),
      priceFrom: new FormControl('10', []),
      priceTo: new FormControl('10000', []),
    })
    this.loadCategories();
    this.searchProducts();
  }


  searchProducts() {
    const cat = this.categories.length > 0 ? this.categories.find(value => value.id === +this.searchForm.value.category) : ''
    const subCat = this.subCategories.length > 0 ? this.subCategories.find(value => value.id === +this.searchForm.value.subCategory) : ''
    let category = cat === undefined ? '' : cat.category;
    let subCategory = subCat === undefined ? '' : subCat.subCategory;

    const param = {
      name: this.searchForm.value.name,
      category: category === undefined ? '' : category,
      subCategory: subCategory === undefined ? '' : subCategory,
      priceFrom: this.searchForm.value.priceFrom,
      priceTo: this.searchForm.value.priceTo,
    }
    this.service.searchProducts(param).subscribe((res: EsResponse) => {
      this.products = res.data; 
    }, error => {
      console.log(error);
    });
  }

  setSubCategory() {
    let filter: any = this.categories.filter(value => value.id === +this.searchForm.value.category)[0];
    this.subCategories = filter.subCategories;
    this.searchProducts();
  }

  private loadCategories() {
    this.service.loadCategories().subscribe((res: EsResponse) => {
      this.categories = res.data;

    }, error => {
      console.log(error);
    });
  }
}
