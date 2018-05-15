import {Component, OnDestroy, OnInit} from '@angular/core';
import {OutletStoreDto, StoreLocationDto} from '../models/dtos/outletstore.model';
import {OutletStoresService} from '../services/outlet-stores.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {StringUtility} from '../helpers/string.utility';

@Component({
  selector: 'app-outlet-stores2',
  templateUrl: './outlet-stores2.component.html',
  styleUrls: ['./outlet-stores2.component.scss']
})
export class OutletStores2Component implements OnInit, OnDestroy {
  storesLeft: Array<OutletStoreDto>;
  storesRight: Array<OutletStoreDto>;
  outletStoreUrl = false;

  private subscription: Subscription;
  constructor(private router: Router, private outletStoreService: OutletStoresService) { }

  ngOnInit() {

    if (this.router.url === '/stores') {
      this.outletStoreUrl = true;
    }

    this.subscription = this.outletStoreService.getStores().subscribe((stores: Array<OutletStoreDto>) => {
      this.storesLeft = stores.slice(0, 3);
      this.storesRight = stores.slice(3, stores.length);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cityString(loc: StoreLocationDto): string {
    return StringUtility.ReplaceAll(loc.city, ' ', '').toLowerCase();
  }

}
