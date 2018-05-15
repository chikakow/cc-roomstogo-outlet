import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {FlierImageDto} from '../models/dtos/flier.model';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {Meta, Title} from '@angular/platform-browser';
import {FlierService} from '../services/flier.service';
import {UserService} from '../services/user.service';
import {WindowRefService} from '../services/window-ref.service';
import {LocationDto} from '../models/dtos/location.model';
import * as Routes from '../../assets/json/routes.json';
import {DetailContentDto} from '../models/dtos/detail.model';
import {DetailService} from '../services/detail.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  images: Array<FlierImageDto>;
  activeSlideIndex = 0;
  detail: DetailContentDto;
  pageTitle: string;
  private subscriptions: Subscription[] = [];
  private timeoutId: any;
  private isBrowser = false;
  private routes: any = Routes;

  constructor(@Inject(DOCUMENT) private document: any,
              @Inject(PLATFORM_ID) private platformId: string,
              public title: Title,
              private meta: Meta,
              private windowRefService: WindowRefService,
              private router: Router,
              private flierService: FlierService,
              private userService: UserService,
              private detailService: DetailService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {

    this.addTitleAndMeta();

    this.subscriptions.push(this.detailService.getHomePageDetail().subscribe((detail: DetailContentDto) => {
      this.detail = detail;
    }));

    this.subscriptions.push(this.userService.userLocation$.subscribe((loc: LocationDto) => {
      if (loc && loc.region && loc.city) {
        this.subscriptions.push(this.flierService.getWeeklyFlierByRegion(loc.region, loc.city).subscribe((flier: any) => {
          if (flier) {
            this.pageTitle = flier.title;
            this.images = flier.images;
          }
        }));
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    clearTimeout(this.timeoutId);
  }

  private addTitleAndMeta() {
    let route = this.routes.find(r => r.path === this.router.url.substring(1));
    if (!route) {
      route = this.routes.find(r => r.path === '**');
    }
    if (route) {
      if (route.title) {
        this.title.setTitle(route.title);
      }
      if (route.description) {
        this.meta.updateTag({name: 'description', content: route.description});
      }
    }
  }

  activateCarousel (index: number) {
    this.activeSlideIndex = index;
  }

  get h1Text() {
    if (this.pageTitle) {
      return this.pageTitle.toUpperCase();
    }
    return this.title.getTitle().toUpperCase();
  }

}
