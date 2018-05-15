import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {LocationDto} from '../models/dtos/location.model';
import {LocationService} from './location.service';
import {RegionHelper} from '../helpers/region.helper';
import {CookieKeys, CookieWrapperService} from './cookie.service';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {

  userLocation: BehaviorSubject<LocationDto> = new BehaviorSubject(this.getDefaultUserLocation());
  userLocation$ = this.userLocation.asObservable();

  constructor(private locationService: LocationService) { }

  getDefaultUserLocation(): LocationDto {
    const location = new LocationDto();
    location.region = 'SE';
    location.state_iso_code = 'GA';
    location.city = 'Atlanta';
    return location;
  }

  initializeUserLocation() {
    // const userLocFromCookie = this.getUserLocationFromCookie();

    // if (!userLocFromCookie) {
      this.locationService.getLocationByIP().subscribe((loc: LocationDto) => {
        if (loc && loc.region && RegionHelper.flierRegions.indexOf(loc.region.toLowerCase()) > -1) {
          this.setUserLocation(loc);
        } else {
          this.setUserLocation(this.getDefaultUserLocation());
        }
      });
    // } else {
      // this.userLocation.next(userLocFromCookie);
    // }
  }

  // getUserLocationFromCookie(): LocationDto {
  //   const userLoc = <LocationDto>this.cookieService.getObject(CookieKeys.userLocation);
  //   if (!userLoc || !userLoc.region) {
  //     return null;
  //   }
  //
  //   return userLoc;
  // }

  setUserLocation(location: LocationDto) {
    if (!location) {
      console.error('user.service: Cannot set location that is empty.');
      return;
    }

    if (!location.region) {
      console.error('user.service: Cannot set location with an empty region.');
      return;
    }

    if (RegionHelper.flierRegions.indexOf(location.region.toLowerCase()) === -1) {
      console.error('user.service: We are only supporting regions within: ', RegionHelper.flierRegions.join(', '));
    }

    // this.cookieService.setObject(CookieKeys.userLocation, location, 30);

    this.userLocation.next(location);
  }
}
