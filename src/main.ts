import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Angular issue with anguar removing trailing slash automatically - below link explain the hack.
// https://github.com/angular/angular/issues/16051

// import { Location } from '@angular/common';
// const __stripTrailingSlash = (Location as any).stripTrailingSlash;
// (Location as any).stripTrailingSlash = function _stripTrailingSlash(url: string): string {
//   return /[^\/]\/$/.test(url) ? url : __stripTrailingSlash(url);
// }


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
