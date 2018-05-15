import { Injectable } from '@angular/core';
import * as Coupons from 'assets/json/coupon.json';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {CouponDto} from '../models/dtos/coupon.model';

@Injectable()
export class CouponService {
  private coupons: any = Coupons;

  constructor() { }

  getCoupons(key: string): Observable<CouponDto[]> {

    const coupons = <CouponDto[]>this.coupons.filter(c => c.key === key);

    return Observable.of(coupons);
  }
}
