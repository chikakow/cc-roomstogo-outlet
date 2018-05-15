import { Component, OnInit } from '@angular/core';
import {FixedHeaderService} from '../../services/fixed-header.service';

@Component({
  selector: 'app-coupon-app',
  templateUrl: './coupon-app.component.html',
  styleUrls: ['./coupon-app.component.scss']
})
export class CouponAppComponent implements OnInit {

  isRemove = false;

  constructor(private fixedHeaderService: FixedHeaderService) { }

  ngOnInit() {
  }

  remove () {
    this.isRemove = true;
    this.fixedHeaderService.setTotalHeight();
  }

}
