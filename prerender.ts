// Load zone.js for the server.
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const mkdirp = require('mkdirp');

import { enableProdMode } from '@angular/core';
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { renderModuleFactory } from '@angular/platform-server';
import {StringUtility} from './src/app/helpers/string.utility';
const ROUTES = require('./dist/server/assets/json/routes.json');
const STORES = require('./dist/server/assets/json/outlet-stores.json');
const COUPONS = require('./dist/server/assets/json/coupon.json');

let LOCATIONS = [];

STORES.forEach((s) => {
  LOCATIONS = LOCATIONS.concat(s.locations);
});

const STORE_PATHS = LOCATIONS.map((l) => {
  return `stores/${StringUtility.ReplaceAll(l.city, ' ', '').toLowerCase()}/${l.id}`;
});

const COUPON_PATH = COUPONS.map(c => `coupons/${c.key}`);

let PATHS = ROUTES.map(route => route.path).filter(path => path !== '**' && path !== 'stores/:city/:id' && path !== 'coupons/:key');

PATHS = STORE_PATHS.concat(PATHS);
PATHS = COUPON_PATH.concat(PATHS);

console.log('PATHS', JSON.stringify(PATHS));

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');

const BROWSER_FOLDER = join(process.cwd(), 'browser');

// Load the index.html file containing references to your application bundle.
const index = readFileSync(join('browser', 'index.html'), 'utf8');

let previousRender = Promise.resolve();

// Iterate each route path
PATHS.forEach(route => {
  const fullPath = join(BROWSER_FOLDER, route);

  // Make sure the directory structure is there
  if (!existsSync(fullPath)) {
    mkdirp.sync(fullPath);
  }

  // Writes rendered HTML to index.html, replacing the file if it already exists.
  previousRender = previousRender.then(_ => renderModuleFactory(AppServerModuleNgFactory, {
    document: index,
    url: route,
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  })).then(html => writeFileSync(join(fullPath, 'index.html'), html));
});
