import { MenuService } from './menu.service';
import { MenuItemDto } from '../models/dtos/menuitem.model';
import {Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Response, ResponseOptions} from '@angular/http';
import {async} from '@angular/core/testing';

describe('MenuService', () => {
  let menuService: MenuService,
    mockHttp, mockScreenService, mockFixedHeaderService;

  const menuData = [{
    'text': 'Living Room',
    'icon': 'glyphicon-dashboard',
    'route': null,
    'submenu': [
      {
        'text': 'Sofas',
        'icon': 'glyphicon-dashboard',
        'route': 'discount-living-rooms/sofas',
        'submenu': true
      },
      {
        'text': 'Sleeper Sofas',
        'icon': 'glyphicon-flag',
        'route': 'discount-living-rooms/sleeper-sofas',
        'submenu': false
      }
    ],
    'submenuLink': './assets/images/livingroom.png'
  },
    {
      'text': 'Dining Room',
      'icon': 'glyphicon-dashboard',
      'route': null,
      'submenu': [
        {
          'text': 'Dining Room Sets',
          'icon': 'glyphicon-dashboard',
          'route': 'discount-dining-rooms/dining-set',
          'submenu': false
        },
        {
          'text': 'Tables',
          'icon': 'glyphicon-flag',
          'route': 'discount-dining-rooms/tables',
          'submenu': null
        }
      ],
      'submenuLink': './assets/images/diningroom.png'
    }];

  const weeklySpecialMenuData = [
    {
      'text': 'Weekly Printable Ad',
      'icon': '',
      'route': 'weekly',
      'submenu': null
    },
    {
      'text': 'Matress Printable Ad',
      'icon': '',
      'route': 'flier/matress',
      'submenu': null
    }
  ];

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['get']);
    mockScreenService = new Object(); // jasmine.createSpyObj('mockScreenService', ['isLarge', 'screenResizeIsLarge$']);
    mockFixedHeaderService = jasmine.createSpyObj('mockFixedHeaderService', ['setTotalHeight']);

    mockScreenService.isLarge = false;
    mockScreenService.screenResizeIsLarge$ = Observable.of(false);
    menuService = new MenuService(mockHttp, mockScreenService, mockFixedHeaderService, '');
  });

  describe('reset', () => {

    it('should set isOpen and isVertical if it is isLarge', () => {

      const isLarge = true;
      menuService.reset(isLarge);
      expect(menuService.isVertical).toBe(false);
      expect(menuService.isOpen).toBe(false);
    });

    it('should set isOpen and isVertical if it is NOT isLarge', () => {

      const isLarge = false;
      menuService.reset(isLarge);
      expect(menuService.isVertical).toBe(true);
      expect(menuService.isOpen).toBe(false);
    });
  });

  describe('openSideNav', () => {

    it('should calll FixedHeaderService setTotalHeight method', () => {

      menuService.openSideNav();
      expect(mockFixedHeaderService.setTotalHeight).toHaveBeenCalled();
    });

    it('should change to open state', () => {

      menuService.isOpen = false;
      menuService.isVertical = false;
      menuService.openSideNav();
      expect(menuService.isOpen).toBe(true);
      expect(menuService.isVertical).toBe(true);
    });
  });

  describe('hydrateItems', () => {

    let emptyResponse, menuResponse, weeklyResponse;

    beforeEach(() => {
      emptyResponse = {};
      menuResponse = menuData;
      weeklyResponse = weeklySpecialMenuData;
    });

    it('should make two http requests with certain url paramters', () => {
      const response = new Response(<ResponseOptions>{
        body: JSON.stringify(emptyResponse)
      });

      mockHttp.get.and.returnValue(Observable.of(response));
      menuService.hydrateItems();
      expect(mockHttp.get).toHaveBeenCalledWith('assets/json/menu.json');
      expect(mockHttp.get).toHaveBeenCalledWith('assets/json/weeklySpecialMenu.json');
    });

    it('should hydrate items', async() => {
      const response = new Response(<ResponseOptions>{
        body: JSON.stringify(menuResponse)
      });

      const responseWeekly = new Response(<ResponseOptions>{
        body: JSON.stringify(weeklyResponse)
      });

      mockHttp.get.and.callFake(function() {
        const url = arguments[0];
        if (url === 'assets/json/menu.json') {
          return Observable.of(response);
        } else if (url === 'assets/json/weeklySpecialMenu.json') {
          return Observable.of(responseWeekly);
        }
      });

      menuService.hydrateItems();

      expect(menuService.items.length).toBe(2);
      expect(menuService.items[0].text).toBe('Living Room');
    });

  });

  describe('closeAllSubmenu', () => {

    let emptyResponse, menuResponse;

    beforeEach(() => {
      emptyResponse = {};
      menuResponse = menuData;
    });

    it('should close open submenu', () => {
      const response = new Response(<ResponseOptions>{
        body: JSON.stringify(menuResponse)
      });

      mockHttp.get.and.returnValue(Observable.of(response));
      menuService.hydrateItems();
      menuService.closeAllSubmenu();

      const subMenu: MenuItemDto = <MenuItemDto>(<Array<MenuItemDto>>menuService.items
        .find((item) => item.text === 'Living Room').submenu)
        .find((sub) => sub.text === 'Sofas');

      expect(subMenu.submenuOpen).toBe(false);
    });

    it('should close submenu whose property set to be null', () => {
      const response = new Response(<ResponseOptions>{
        body: JSON.stringify(menuResponse)
      });

      mockHttp.get.and.returnValue(Observable.of(response));
      menuService.hydrateItems();
      menuService.closeAllSubmenu();

      const subMenu: MenuItemDto = <MenuItemDto>(<Array<MenuItemDto>>menuService.items
        .find((item) => item.text === 'Dining Room').submenu)
        .find((sub) => sub.text === 'Tables');

      expect(subMenu.submenuOpen).not.toBeNull();
      expect(subMenu.submenuOpen).toBe(false);
    });

  });
});
