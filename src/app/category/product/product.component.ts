import {Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ProductDto} from '../../models/dtos/product.model';
import {OwlCarousel} from 'ngx-owl-carousel';
import {ScreenService} from '../../services/screen.service';
import {Subscription} from 'rxjs/Subscription';
import {Subcategory} from '../../models/subcategory.model';
import {UserService} from '../../services/user.service';
import {LocationDto} from '../../models/dtos/location.model';
import {isPlatformBrowser} from '@angular/common';
import {WindowRefService} from '../../services/window-ref.service';
import {MenuService} from '../../services/menu.service';
import {DetailContentDto} from '../../models/dtos/detail.model';
import {DetailService} from '../../services/detail.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  @ViewChild('owlElement') owlElement: OwlCarousel;
  @Input() subcategory: Subcategory;

  products: ProductDto[] = [];
  numOfItems = 5;
  rtgLinkDefault = 'https://www.roomstogo.com/';
  isBrowser: boolean;
  detail: DetailContentDto;
  private subscriptions: Subscription[] = [];
  private isOwlDragging = false;

  constructor(private productService: ProductService,
              private userService: UserService,
              private windowRefService: WindowRefService,
              private screenService: ScreenService,
              private detailService: DetailService,
              private router: Router,
              public menuService: MenuService,
              @Inject(PLATFORM_ID) platformId: string) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {

    this.subscriptions.push(this.detailService.getDetail('/' + this.subcategory.route).subscribe((detail: DetailContentDto) => {
      this.detail = detail;

      // this is ok to nest like this if only user location is changed detailService won't fetch get detail again but keeps this.detail
      // I proved this by putting the breakpoints on browser to make sure of this.
      this.subscriptions.push(this.userService.userLocation$.subscribe((loc: LocationDto) => {
        this.subscriptions.push(this.productService.getProductByCategoryHierarchy(this.detail.categoryHierarchy, loc.region).subscribe((products: Array<ProductDto>) => {

          if (products && products.length && products.length > 0) {
            this.products = products;
            if (this.isBrowser) {
              this.owlElement.reInit();
            }
          }
        }));
      }));
    }));

    this.subscriptions.push(this.screenService.screenResizeIsLarge$.subscribe(() => {

      const oldNumOfItems = this.numOfItems;

      if (this.screenService.isScreenExtraSmall) {
        this.numOfItems = 1;
      } else if (this.screenService.isScreenSmall || this.screenService.isScreenMediuml) {
        this.numOfItems = 2;
      } else if (this.screenService.isScreenLarge) {
        this.numOfItems = 3;
      } else if (this.screenService.isScreenExtraLarge) {
        this.numOfItems = 4;
      }

      if (this.numOfItems !== oldNumOfItems) {
        this.refreshCarousel();
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private refreshCarousel() {
    if (!this.products) {
      return;
    }

    if (this.products.length > 0 && this.products.length < this.numOfItems) {
      this.numOfItems = this.products.length;
    }

    if (this.isBrowser && this.owlElement) {
      this.owlElement.items = [this.numOfItems];
      this.owlElement.refresh();
    }
  }

  next() {
    if (this.isBrowser) {
      this.owlElement.next();
    }
  }

  previous() {
    if (this.isBrowser) {
      this.owlElement.previous();
    }
  }

  itemClick(productUrl: string) {
    if (this.isBrowser && ! this.isOwlDragging) {
      this.windowRefService.nativeWindow.open(productUrl);
    }
  }

  owlDragStart(event) {
    this.isOwlDragging = true;
  }

  owlDragEnd(event) {
    if (this.isBrowser) {
      setTimeout(() => {
        this.isOwlDragging = false;
      }, 0);
    }
  }

  owlPrevious(event) {
    if (this.isBrowser) {
    }
  }
}
