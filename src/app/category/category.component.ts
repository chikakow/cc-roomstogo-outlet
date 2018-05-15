import { Component, OnInit } from '@angular/core';
import {DetailContentDto} from '../models/dtos/detail.model';
import {Router} from '@angular/router';
import {DetailService} from '../services/detail.service';
import {ProductService} from '../services/product.service';
import {CategoryDto} from '../models/dtos/product.model';
import {Subcategory} from '../models/subcategory.model';
import * as Routes from '../../assets/json/routes.json';
import {Meta, Title} from '@angular/platform-browser';
import {MenuService} from '../services/menu.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  subcategories: Array<Subcategory> = [];
  detail: DetailContentDto;
  private routes: any = Routes;

  constructor(private meta: Meta,
              private title: Title,
              private router: Router,
              private productService: ProductService,
              private detailService: DetailService) { }

  ngOnInit() {

    this.addTitleAndMeta();

    this.productService.getSubCategories(this.router.url)
      .subscribe((subcategories) => {
        if (subcategories && subcategories.length && subcategories.length > 0) {
          this.subcategories = subcategories;
        }
      }
    );

    this.detailService.getDetail(this.router.url).subscribe((detail: DetailContentDto) => {
      this.detail = detail;
    });
  }

  private addTitleAndMeta() {
    const route = this.routes.find(r => r.path === this.router.url.substring(1));
    if (route) {
      if (route.title) {
        this.title.setTitle(route.title);
      }
      if (route.description) {
        this.meta.updateTag({name: 'description', content: route.description});
      }
    }
  }
}
