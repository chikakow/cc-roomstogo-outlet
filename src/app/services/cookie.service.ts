import { Injectable } from '@angular/core';
// import {CookieService} from 'ngx-cookie';

@Injectable()
export class CookieWrapperService {

  constructor(
    // private cookieService: CookieService
  ) { }

  setObject(key: string, value: Object, expireInDays: number) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expireInDays);
    // this.cookieService.putObject(key, value, {expires: expiryDate});
  }

  // getObject(key: string): Object {
  //  return this.cookieService.getObject(key);
  // }

  deleteCookie(key: string) {
    // this.cookieService.deleteCookie(key);
  }
}

export const CookieKeys = {
  userLocation: 'userLocation'
};
