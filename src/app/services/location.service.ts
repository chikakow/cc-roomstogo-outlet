import { Injectable } from '@angular/core';
import {Observable, ObservableInput} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';
import {HttpService, RequestHelper} from './http.service';
import {LocationDto} from '../models/dtos/location.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LocationService {

  constructor(private http: HttpClient) {

  }

  getLocationByIP(): Observable<LocationDto> {
    const url = 'https://b51psyseeh.execute-api.us-east-1.amazonaws.com/staging/state/ip';
    return this.http.get(url);
  }

  getLocationFromZip (zip: number): Observable<LocationDto> {
    const zipToAddressUrl = `https://b51psyseeh.execute-api.us-east-1.amazonaws.com/staging/state/zipcode/${ zip }`;
    return this.http.get(zipToAddressUrl);
  }
}
