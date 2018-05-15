import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser} from '@angular/common';

@Injectable()
export class StorageService {
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: string) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getLocal<T>(key: string): T {
    if (this.isBrowser) {
      return JSON.parse(localStorage.getItem(key));
    } else {
      return null;
    }
  }

  setLocal(key: string, value: any): any {
    if (this.isBrowser) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  removeLocal(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }
}

export const StorageKeys = {
  userInfo: 'userInfo'
}

