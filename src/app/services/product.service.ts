import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import * as Details from 'assets/json/detail.json';
import * as Menu from 'assets/json/menu.json';
import {DetailDto} from '../models/dtos/detail.model';
import {ProductDto} from '../models/dtos/product.model';
import { HttpClient } from '@angular/common/http';
import {Subcategory} from '../models/subcategory.model';
import {MenuItemDto} from '../models/dtos/menuitem.model';

@Injectable()
export class ProductService {
  details: any = Details;
  menu: any = Menu;

  constructor(private http: HttpClient) {

  }

  // getSkusBySubcategory(subcategory: string): Observable<Array<string>> {
  //   const subc = this.subcategoryToSkus.find((s: any) => {
  //     return s.name === subcategory;
  //   });
  //
  //   const skus = subc ? subc.skus : [];
  //
  //   return Observable.of(skus);
  // }
  //
  // getRtgLinkForSubcategory(subcategory: string): string {
  //   const subc = this.subcategoryToSkus.find((s: any) => {
  //     return s.name === subcategory;
  //   });
  //
  //   const rtglink = subc ? subc.rtgLinkDefault : '';
  //
  //   return rtglink;
  // }

  getProductsBySkus(skus: Array<string>): Observable<Array<ProductDto>> {

    if (!skus) {
      return Observable.of([]);
    }

    const skusParam = skus.join('||');

    const productUrl = `https://4qnshg9dkl.execute-api.us-east-1.amazonaws.com/prod?shortcode=[masterfeed fields="sku:${ skusParam }" company="RoomsToGo" sort="price" ]`;

    return this.http.get(encodeURI(productUrl)).map((response: any) => {

      return response.response.results;
    });
  }

  getProductByCategoryHierarchy(categoryHierarchy: string, region: string): Observable<Array<ProductDto>> {

    const groupbylimit = 15;

    const shortcode = `[cloudsearch company="RoomsToGo" category="${ categoryHierarchy }" ` +
    `exclusions="sku: 10136605||10183907||10183983" fields="${region.toLowerCase()}_av: 1" sort="price asc" groupby="collection" limit="300"]`;

    const payload = {
      type: 'shortcode', shortcode: shortcode
    };

    const productUrl = `https://shortcodes.furnitureapis.com/?payload=${JSON.stringify(payload)}`;

    return this.http.get(encodeURI(productUrl)).map((response: any) => {
      if (response.response.total > 0) {
        let results = response.response.results;
        if (response.response.results.length > groupbylimit) {
          results = response.response.results.slice(0, groupbylimit);
        }
        return results;
      }
      return Observable.of(new Array<ProductDto>());
    });
  }

  getSubCategories(routerUrl: string): Observable<Array<Subcategory>> {

    const menuItem = (<Array<MenuItemDto>>this.menu).find(d => d.route === routerUrl.substring(1));

    const subcategories: Array<Subcategory> = menuItem.submenu.map(sub => {
      const subc = new Subcategory();
      subc.name = sub.text;
      subc.rtgLink = sub.rtglink;
      subc.route = sub.route;
      return subc;
    });

    return Observable.of(subcategories);
  }
}
