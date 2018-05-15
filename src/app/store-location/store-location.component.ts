import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {GoogleMapService} from '../services/google-map.service';
import {OutletStoresService} from '../services/outlet-stores.service';
import {StoreLocationDto} from '../models/dtos/outletstore.model';
import {GoogleMapLatLngDto} from '../models/dtos/google-map.module';
import {Meta, Title} from '@angular/platform-browser';
import * as RouteList from '../../assets/json/routes.json';
import {LocationDto} from '../models/dtos/location.model';
import {UserService} from '../services/user.service';
import {LocationService} from '../services/location.service';
import {isPlatformBrowser} from '@angular/common';
import {DetailContentDto} from '../models/dtos/detail.model';
import {DetailService} from '../services/detail.service';

@Component({
  selector: 'app-store-location',
  templateUrl: './store-location.component.html',
  styleUrls: ['./store-location.component.scss']
})
export class StoreLocationComponent implements OnInit, OnDestroy {
  // @ViewChild(AgmMap) public map: AgmMap;
  lat = 1200;
  lng = 1200;
  subscriptions: Subscription[] = [];
  storeId: number;
  store: StoreLocationDto;
  isBrowser = false;
  detail: DetailContentDto;

  private routes: any = RouteList;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private meta: Meta,
              private title: Title,
              private storeService: OutletStoresService,
              private googleMapService: GoogleMapService,
              private userService: UserService,
              private locationService: LocationService,
              private detailService: DetailService,
              @Inject(PLATFORM_ID) private platformId: string) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {

    this.subscriptions.push(this.route.url.subscribe(url => {
      this.subscriptions.push(this.detailService.getDetail(`/${this.route.snapshot.url.join('/')}`).subscribe(d => this.detail = d));
    }));

    this.subscriptions.push(this.route.params.subscribe(params => {
      this.storeId = +params['id'];
      this.subscriptions.push(this.storeService.getStore(this.storeId).subscribe((store: StoreLocationDto) => {
        this.store = store;
        this.addTitleAndMeta(store);
        this.subscriptions.push(this.googleMapService.getLatLngFromAddress(this.store)
          .subscribe((gmap: GoogleMapLatLngDto) => {
            this.lat = gmap.geometry.location.lat;
            this.lng = gmap.geometry.location.lng;
          }));
      }));
    }));

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    });
  }

  get storeStreet(): string {
    if (this.store && this.store.street2) {
      return `${this.store.street1}, ${this.store.street2}`;
    } else if (this.store) {
      return `${this.store.street1}`;
    }
  }

  get hideSpecials(): boolean {
    let hide = true;
    if (this.store && this.store.state_abbreviation.toLowerCase() !== 'pr') {
      hide = false;
    }
    return hide;
  }

  get destination(): string {
    if (!this.store) {
      return '';
    }

    let encodedAddress = '';

    if (this.store.state_abbreviation.toLowerCase() === 'pr') {
      encodedAddress = encodeURI(`Rooms to go outlet ${this.store.city}, ${this.store.state} ${this.store.zip_code}`);
    } else {
      const outletTitle = this.store.only_address_for_coord ? '' : 'Rooms to go outlet furniture store';
      encodedAddress = encodeURI(`${outletTitle} ${this.storeStreet}, ${this.store.city}, ${this.store.state} ${this.store.zip_code}`);
    }

    return encodedAddress;
  }

  specialsLinkClick(spType: string) {

    this.subscriptions.push(this.locationService.getLocationFromZip(+this.store.zip_code)
      .subscribe((location: LocationDto) => {
        if (location && location.region) {
          this.userService.setUserLocation(location);
          this.router.navigate([`/${spType}/${location.region.toLowerCase()}`]);
        }
      }));
  }

  private addTitleAndMeta(store: StoreLocationDto) {
    if (!store) {
      return;
    }

    const route = this.routes.find(r => r.component === 'StoreLocationComponent');
    if (route) {
      if (route.title) {
        this.title.setTitle(route.title.replace('[city]', store.city).replace('[state_abbreviation]', store.state_abbreviation));
      }
      if (route.description) {
        this.meta.updateTag({name: 'description', content: route.description.replace('[city]', store.city).replace('[state]', store.state)});
      }
    }
  }

  storeHours(day: string): string {
    if (!this.store) {
      return '';
    }
    if (!this.store.store_hours[day].from) {
      return 'Closed';
    }
    return `${this.store.store_hours[day].from} - ${this.store.store_hours[day].to}`;
  }

  // mapTypeIdChange(typeId: MapTypeId) {
  //   console.log('type id', typeId);
  // }
  //
  // mapReady(event: any) {
  //   console.log('map ready event', event);
  // }

}
