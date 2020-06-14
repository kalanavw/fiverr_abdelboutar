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
  rating = Array;

  constructor(private service: ProductService) {
  }

  ngOnInit(): void {
    $("#range").ionRangeSlider({
      type: "double",
      grid: true,
      min: 0,
      max: 10000,
      from: 500,
      to: 5000,
      prefix: "£"
    });


    $(document).on('click', '.my-badge', function () {
      if ($(this).hasClass('favourite')) {
        $(this).removeClass('badge-black favourite').attr('title', 'Un Favourite').addClass('badge-red un-favourite').html('<i class="fa fa-heart"></i>');
      } else {
        $(this).removeClass('badge-red un-favourite').attr('title', 'Make Favourite').addClass('badge-black favourite').html('<i class="far fa-heart"></i>');
      }
    });

    $(document).on('click', '.filter-heading', function () {
      if ($('.filter-heading i').hasClass('fa-angle-double-down')) {
        $('.filter-heading i').removeClass('fa-angle-double-down').addClass('fa-angle-double-up');
        $('.filter-box').show();
      } else {
        $('.filter-heading i').removeClass('fa-angle-double-up').addClass('fa-angle-double-down');
        $('.filter-box').hide();
      }
    });
    this.searchForm = new FormGroup({
      name: new FormControl('', []),
    })
    this.searchProducts();
  }

  private searchProducts() {
    this.service.searchProducts(this.searchForm.value).subscribe((res: EsResponse) => {
      this.products = res.data;
    });
  }

}
