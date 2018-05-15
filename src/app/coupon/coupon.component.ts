import {Component, OnDestroy, OnInit} from '@angular/core';
import {CouponService} from '../services/coupon.service';
import {Subscription} from 'rxjs/Subscription';
import {ImageDto} from '../models/dtos/image.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit, OnDestroy {
  public coupons: ImageDto[];
  private subscriptions: Subscription[] = [];
  private dateKey: string;

  constructor(private couponService: CouponService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.subscriptions.push(this.route.params.subscribe(params => {
      console.log('params', params);
      this.dateKey = params['key'];

      this.subscriptions.push(this.couponService.getCoupons(this.dateKey).subscribe((coupons: ImageDto[]) => {
        this.coupons = coupons;
      }));
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
