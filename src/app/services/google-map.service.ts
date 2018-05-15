import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {GoogleMapLatLngDto} from '../models/dtos/google-map.module';
import {RequestHelper} from './http.service';
import {StoreLocationDto} from '../models/dtos/outletstore.model';

@Injectable()
export class GoogleMapService {

  constructor(private http: HttpClient) { }

  getLatLngFromAddress(store: StoreLocationDto): Observable<any> {

    let address = '';
    const  street2 = store.street2,
      street1 = store.street1,
      city = store.city,
      state_abbreviation = store.state_abbreviation,
      zipcode = store.zip_code,
      onlyUseAddressForCoord = store.only_address_for_coord,
      outletTitle = onlyUseAddressForCoord ? '' : 'Rooms to go outlet furniture store';

    if (street2) {
      address = `${outletTitle} ${street1}, ${street2}, ${city}, ${state_abbreviation} ${zipcode}`;
    } else {
      address = `${outletTitle} ${street1}, ${city}, ${state_abbreviation} ${zipcode}`;
    }

    if (state_abbreviation.toLowerCase() === 'pr') {
      address = `Rooms to go outlet, ${city}, Puerto Rico`;
    }

    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${environment.google_map_api_key}`)
      .map((res: any) => res.results[0]);
  }

}
