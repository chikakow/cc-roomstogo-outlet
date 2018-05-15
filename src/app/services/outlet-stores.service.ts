
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import * as Stores from 'assets/json/outlet-stores.json';
import {OutletStoreDto, StoreLocationDto} from '../models/dtos/outletstore.model';

@Injectable()
export class OutletStoresService {
  stores: any = Stores;

  constructor() { }

  getStores(): Observable<Array<OutletStoreDto>> {
    const stores = (<Array<OutletStoreDto>>this.stores);
    return Observable.of(stores);
  }

  getStore(id: number): Observable<StoreLocationDto> {
    const stores = (<Array<OutletStoreDto>>this.stores);
    let store: StoreLocationDto;
    stores.forEach((s) => {
      if (!store) {
        store = s.locations.find((l) => {
          return l.id === id;
        });
      }
    });

    return Observable.of(store);
  }
}
