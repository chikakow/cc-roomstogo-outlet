import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {Router} from '@angular/router';
import {FlierService} from '../services/flier.service';
import {FlierContentDto, FlierImageDto} from '../models/dtos/flier.model';
import {UserService} from '../services/user.service';
import {LocationDto} from '../models/dtos/location.model';
import {Subscription} from 'rxjs/Subscription';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {WindowRefService} from '../services/window-ref.service';
import {Meta, Title} from '@angular/platform-browser';
import * as Routes from '../../assets/json/routes.json';
import {MenuService} from '../services/menu.service';
import {RegionHelper} from '../helpers/region.helper';

@Component({
  selector: 'app-flier',
  templateUrl: './flier.component.html',
  styleUrls: ['./flier.component.scss']
})
export class FlierComponent implements OnInit, OnDestroy {
  images: Array<FlierImageDto>;
  activeSlideIndex = 0;
  pageTitle: string;
  private subscriptions: Subscription[] = [];
  private timeoutId: any;
  private isBrowser = false;
  private routes: any = Routes;

  constructor(public menuService: MenuService,
              @Inject(DOCUMENT) private document: any,
              @Inject(PLATFORM_ID) private platformId: string,
              public title: Title,
              private meta: Meta,
              private windowRefService: WindowRefService,
              private router: Router,
              private flierService: FlierService,
              private userService: UserService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {

    this.addTitleAndMeta();

    this.subscriptions.push(this.userService.userLocation$.subscribe((loc: LocationDto) => {
      // get region from router url
      // const region = (this.router.url).match(/-specials\/(\w{2})?/);
      const url = this.router.url.substring(0, this.router.url.length - 2);
      if (loc && loc.region && RegionHelper.flierRegions.indexOf(loc.region.toLowerCase()) > -1) {
        this.router.navigate([url + loc.region.toLowerCase()]);
      }

      this.subscriptions.push(this.flierService.getFlier(this.router.url, loc.city).subscribe((flier: FlierContentDto) => {
        this.images = flier.images;
        this.pageTitle = flier.title;
      }));
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    clearTimeout(this.timeoutId);
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

  // print(mode: string) {
  //   if(this.isBrowser) {
  //     const cssSelector = mode === 'carousel' ? '.carousel-inner .carousel-item.active' : '.single-flier';
  //     let printContents, popupWin;
  //     printContents = this.document.querySelector(cssSelector).innerHTML;
  //     popupWin = this.windowRefSerivce.nativeWindow.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  //     popupWin.location = 'print.html';
  //     popupWin.document.open();
  //     popupWin.document.write(`
  //     <html>
  //       <head>
  //         <title>Print tab</title>
  //       </head>
  //   <body onload="window.print();">${printContents}</body>
  //     </html>`
  //     );
  //     popupWin.document.close();
  //
  //     this.timeoutId = setTimeout(() => {
  //       popupWin.close();
  //     }, 500);
  //   }
  // }

  activateCarousel (index: number) {
    this.activeSlideIndex = index;
  }

  get h1Text() {
    if (this.pageTitle) {
      return this.pageTitle.toUpperCase().replace('OUTLET', '');
    }
    return this.title.getTitle().toUpperCase().replace('OUTLET', '');
  }

}
