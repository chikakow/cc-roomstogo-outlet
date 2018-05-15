import {Inject, Injectable, OnDestroy, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {HttpClient} from '@angular/common/http';

import { MenuItemDto } from '../models/dtos/menuitem.model';
import {ScreenService} from './screen.service';
import {Subscription} from 'rxjs/Subscription';
import {FixedHeaderService} from './fixed-header.service';
import * as Menus from 'assets/json/menu.json';
import * as WeeklyMenus from 'assets/json/weeklySpecialMenu.json';


@Injectable()
export class MenuService implements OnDestroy {
  items: Array<MenuItemDto>;
  specialsMenuItems: Array<MenuItemDto> = [];
  private specialsItems: Array<MenuItemDto> = []; // this gets initial weekly special menu items from server it does not contain region.

  isVertical = false;
  isOpen = false;
  isBrowser = false;
  private subscriptions: Subscription[] = [];
  private menus: any = Menus;
  private weeklyMenus: any = WeeklyMenus;

  constructor(private http: HttpClient,
              private screenService: ScreenService,
              private fixedHeaderService: FixedHeaderService,
              @Inject(PLATFORM_ID) platformId: string) {
    this.isBrowser = isPlatformBrowser(platformId);

    this.reset(screenService.isLarge);

    if (this.isBrowser) {
      this.subscriptions.push(screenService.screenResizeIsLarge$.subscribe((isLarge: boolean) => this.reset(isLarge)));
    }
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  reset (isLarge: boolean) {
    if (isLarge) {
      this.isVertical = false;
      this.isOpen = false;
    } else {
      this.isVertical = true;
      this.isOpen = false;
    }
  }

  toggleSideNav() {
    if (this.isOpen) {
      this.closeSideNav();
    } else {
      this.openSideNav();
    }
  }

  closeSideNav() {
    this.isOpen = false;
  }

  openSideNav() {
    this.fixedHeaderService.setTotalHeight();
    this.isOpen = true;
    this.isVertical = true;
  }

  hydrateItems() {
    this.items =  <Array<MenuItemDto>>this.menus;
    this.specialsItems = <Array<MenuItemDto>>this.weeklyMenus;
  }

  hydrateSpecialsMenuItems(region: string) {
    const newMenu = JSON.parse(JSON.stringify(this.specialsItems));
    newMenu.filter(item => !!item.route).map(item => { item.route = item.route + `/${region.toLowerCase()}`; });
    this.specialsMenuItems = newMenu;
  }

  closeAllSubmenu() {
    if (this.items && this.items.length) {
      this.closeAllSubmenuRecursive(this.items);
    }
  }

  closeAllSubmenuRecursive(items: Array<MenuItemDto>): void {
    items.forEach(item => {
      item.submenuOpen = false;
      if (item.submenu && item.submenu.length) {
        this.closeAllSubmenuRecursive(item.submenu);
      }
    });
  }

}
