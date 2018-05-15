import { Injectable } from '@angular/core';
import * as Routes from 'assets/json/routes.json';
import {Observable} from 'rxjs/Observable';
import {Route} from '@angular/router';
import {FlierComponent} from '../flier/flier.component';
import {DetailComponent} from '../detail/detail.component';
import {OutletStoresComponent} from '../outlet-stores/outlet-stores.component';
import {CategoryComponent} from '../category/category.component';
import {TermsOfSaleComponent} from '../customer-service/terms-of-sale/terms-of-sale.component';
import {TermsOfSaleEsComponent} from '../customer-service/terms-of-sale-es/terms-of-sale-es.component';
import {HomeComponent} from '../home/home.component';
import {AppComponent} from '../app.component';
import {CouponComponent} from '../coupon/coupon.component';
import {OutletStores2Component} from '../outlet-stores2/outlet-stores2.component';
import {StoreLocationComponent} from '../store-location/store-location.component';

@Injectable()
export class RouteService {

  routes: any = Routes;

  constructor() { }

  getRoutes(): Observable<Array<Route>> {
    const routeList: Array<Route> = new Array<Route>();

    this.routes.forEach((r) => {
      let route: Route;
      if (r.component === 'FlierComponent') {
        route = {path: r.path, component: FlierComponent};
      } else if (r.component === 'DetailComponent') {
        route = {path: r.path, component: DetailComponent};
      } else if (r.component === 'CategoryComponent') {
        route = {path: r.path, component: CategoryComponent};
      } else if (r.component === 'OutletStores2Component') {
        route = {path: r.path, component: OutletStores2Component};
      } else if (r.component === 'TermsOfSaleComponent') {
        route = {path: r.path, component: TermsOfSaleComponent};
      } else if (r.component === 'TermsOfSaleEsComponent') {
        route = {path: r.path, component: TermsOfSaleEsComponent};
      } else if (r.component === 'HomeComponent') {
        route = {path: r.path, component: HomeComponent};
      } else if (r.component === 'CouponComponent') {
        route = {path: r.path, component: CouponComponent};
      } else if (r.component === 'StoreLocationComponent') {
        route = {path: r.path, component: StoreLocationComponent};
      }

      if (!route) {
        return;
      }

      if (r.pathMatch) {
        route.pathMatch = r.pathMatch;
      }

      routeList.push(route);

    });

    return Observable.of(routeList);
  }

}
