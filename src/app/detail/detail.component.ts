import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Meta, Title} from '@angular/platform-browser';

import {DetailService} from '../services/detail.service';
import {DetailContentDto} from '../models/dtos/detail.model';
import {ProductDto} from '../models/dtos/product.model';
import {ProductService} from '../services/product.service';
import {UserService} from '../services/user.service';
import {LocationDto} from '../models/dtos/location.model';
import * as Routes from '../../assets/json/routes.json';
import {isPlatformBrowser} from '@angular/common';
import {WindowRefService} from '../services/window-ref.service';
import {MenuService} from '../services/menu.service';
import {ImageDto} from '../models/dtos/image.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  isBrowser = false;
  products: ProductDto[] = [];
  bannerProduct: ProductDto;
  bannerImageDesktop: ImageDto;
  bannerImageMobile: ImageDto;
  detail: DetailContentDto;

  private subscriptions: Subscription[] = [];
  private routes: any = Routes;


  constructor(public menuService: MenuService,
              private meta: Meta,
              private title: Title,
              private router: Router,
              private productService: ProductService,
              private detailService: DetailService,
              private userService: UserService,
              private windowRefService: WindowRefService,
              @Inject(PLATFORM_ID) platformId: string) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {


    this.addTitleAndMeta();


    this.subscriptions.push(this.detailService.getDetail(this.router.url).subscribe((detail: DetailContentDto) => {
      this.detail = detail;
      if (this.detail.bannerImages && this.detail.bannerImages.length >= 2) {
        this.bannerImageDesktop = this.detail.bannerImages[0];
        this.bannerImageMobile = this.detail.bannerImages[1];
      }
      // this is ok to nest like this if only user location is changed detailService won't fetch get detail again but keeps this.detail
      // I proved this by putting the breakpoints on browser to make sure of this.
      this.subscriptions.push(this.userService.userLocation$.subscribe((loc: LocationDto) => {
        this.subscriptions.push(this.productService.getProductByCategoryHierarchy(this.detail.categoryHierarchy, loc.region)
          .subscribe((products: Array<ProductDto>) => {
            if (products && products.length && products.length > 0) {
              this.products = products;
            }
            const random = Math.floor(Math.random() * 10);
            this.bannerProduct = this.products[random];
          }));
      }));
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // get bannerImage(): string {
  //   if (!this.router || !this.router.url) {
  //     return '';
  //   }
  //
  //   const urlarr = this.router.url.replace('/discount-', '').split('/');
  //   if (!urlarr || !urlarr.length || urlarr.length === 0) {
  //     return '';
  //   }
  //
  //   const pascalUrl = StringUtility.ToPascalCase(urlarr[0]);
  //
  //   return StringUtility.ReplaceAll(pascalUrl, ' ', '');
  // }

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

  itemClick(productUrl: string) {
    if (this.isBrowser) {
      this.windowRefService.nativeWindow.open(productUrl);
    }
  }

  get addPaddingOnImage(): boolean {
    if (this.detail.title.toLowerCase().indexOf('sets') > -1) {
      return false;
    }
    return true;
  }

}
