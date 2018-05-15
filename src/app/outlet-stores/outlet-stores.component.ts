import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OutletStoresService} from '../services/outlet-stores.service';
import {OutletStoreDto, StoreLocationDto} from '../models/dtos/outletstore.model';
import {Subscription} from 'rxjs/Subscription';
import {StringUtility} from '../helpers/string.utility';

@Component({
  selector: 'app-outlet-stores',
  templateUrl: './outlet-stores.component.html',
  styleUrls: ['./outlet-stores.component.scss']
})
export class OutletStoresComponent implements OnInit, OnDestroy {
  stores: Array<OutletStoreDto>;

  private subscription: Subscription;
  constructor(private router: Router, private outletStoreService: OutletStoresService) { }

  ngOnInit() {

    this.subscription = this.outletStoreService.getStores().subscribe((stores: Array<OutletStoreDto>) => {
      this.stores = stores;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cityString(loc: StoreLocationDto): string {
    return StringUtility.ReplaceAll(loc.city, ' ', '').toLowerCase();
  }
}
