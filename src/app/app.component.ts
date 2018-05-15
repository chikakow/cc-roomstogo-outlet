import {Component, OnDestroy, OnInit} from '@angular/core';
import { MenuService } from './services/menu.service';
import {NavigationEnd, Route, Router} from '@angular/router';
import {RouteService} from './services/route.service';
import {FlierComponent} from './flier/flier.component';
import {DetailComponent} from './detail/detail.component';
import {UserService} from './services/user.service';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';
import {LocationDto} from './models/dtos/location.model';
import {MenuItemDto} from './models/dtos/menuitem.model';
import {WindowRefService} from './services/window-ref.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  entryComponents: [FlierComponent, DetailComponent]
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'app';
  private isBrowser = false;
  private subscriptions: Subscription[] = [];

  constructor(@Inject(PLATFORM_ID) platformId: string,
              private router: Router,
              private routeService: RouteService,
              public menuService: MenuService,
              private userService: UserService,
              private windowRef: WindowRefService) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {

    this.subscriptions.push(this.routeService.getRoutes().subscribe((routes: Array<Route>) => {
      this.router.resetConfig(routes);
    }));

    if (this.isBrowser) {
      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        this.windowRef.nativeWindow.scrollTo(0, 0);
      });
    }

    this.menuService.hydrateItems();

    this.subscriptions.push(this.userService.userLocation$
      .subscribe((loc: LocationDto) => {
        if (loc && loc.region) {
          this.menuService.hydrateSpecialsMenuItems(loc.region);
        }
      }));

    this.userService.initializeUserLocation();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
