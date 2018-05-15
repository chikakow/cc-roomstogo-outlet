import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CarouselModule, ModalModule} from 'ngx-bootstrap';
// https://www.npmjs.com/package/ngx-owl-carousel,  https://owlcarousel2.github.io/OwlCarousel2/docs/api-events.html
import {OwlModule} from 'ngx-owl-carousel';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {SalesComponent} from './header/sales/sales.component';
import {FlierComponent} from './flier/flier.component';
import {MenuComponent} from './menus/menu/menu.component';
import {MenuItemComponent} from './menus/menuitem/menuitem.component';
import {PopupMenuComponent} from './menus/popup-menu/popup-menu.component';
import {DetailComponent} from './detail/detail.component';
import {FooterComponent} from './footer/footer.component';
import {CategoryComponent} from './category/category.component';
import {OutletStoresComponent} from './outlet-stores/outlet-stores.component';
import {ProductComponent} from './category/product/product.component';
import {CouponAppComponent} from './header/coupon-app/coupon-app.component';
import {LoadingIndicatorComponent} from './services/loading/loading-indicator/loading-indicator.component';
import {FlierService} from './services/flier.service';
import {MenuService} from './services/menu.service';
import {WindowRefService} from './services/window-ref.service';
import {RouteService} from './services/route.service';
import {ScreenService} from './services/screen.service';
import {DetailService} from './services/detail.service';
import {LocationService} from './services/location.service';
import {UserService} from './services/user.service';
import {OutletStoresService} from './services/outlet-stores.service';
import {FixedHeaderService} from './services/fixed-header.service';
import {ProductService} from './services/product.service';
import {LoadingInterceptor} from './services/loading/loading-interceptor';
import {LoadingService} from './services/loading/loading.service';
import {Renderer2Service} from './services/renderer2.service';
import { TermsOfSaleComponent } from './customer-service/terms-of-sale/terms-of-sale.component';
import { TermsOfSaleEsComponent } from './customer-service/terms-of-sale-es/terms-of-sale-es.component';
import { ContentsComponent } from './contents/contents.component';
import { YearPipe } from './pipes/rtg-date.pipe';
import { HomeComponent } from './home/home.component';
import { OutletPhraseComponent } from './outlet-phrase/outlet-phrase.component';
import { SpeicalsLinkComponent } from './menus/speicals-link/speicals-link.component';

// TODO: once upgrade to Angular 5v then use this and ngx-cookie
import {CookieWrapperService} from './services/cookie.service';
import { CouponComponent } from './coupon/coupon.component';
import {CouponService} from './services/coupon.service';
import { OutletStores2Component } from './outlet-stores2/outlet-stores2.component';
import { StoreLocationComponent } from './store-location/store-location.component';
import {AgmCoreModule} from '@agm/core';
import {environment} from '../environments/environment';
import {GoogleMap} from '@agm/core/services/google-maps-types';
import {GoogleMapService} from './services/google-map.service';

// declare let jQuery: Object;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OutletStoresComponent,
    SalesComponent,
    FlierComponent,
    MenuComponent,
    MenuItemComponent,
    PopupMenuComponent,
    DetailComponent,
    FooterComponent,
    CategoryComponent,
    ProductComponent,
    CouponAppComponent,
    LoadingIndicatorComponent,
    TermsOfSaleComponent,
    TermsOfSaleEsComponent,
    ContentsComponent,
    YearPipe,
    HomeComponent,
    OutletPhraseComponent,
    SpeicalsLinkComponent,
    CouponComponent,
    OutletStores2Component,
    StoreLocationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'roomstogo-outlet'}),
    HttpClientModule,
    OwlModule,
    FormsModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.google_map_api_key
    }),
    RouterModule.forRoot([]) // {path: '', component:  HomeComponent, pathMatch: 'full' }, {path: '**', component:  HomeComponent }
  ],
  providers: [
    RouteService,
    WindowRefService,
    ScreenService,
    MenuService,
    DetailService,
    ProductService,
    LocationService,
    FlierService,
    UserService,
    OutletStoresService,
    LoadingService,
    Renderer2Service,
    CouponService,
    GoogleMapService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    FixedHeaderService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ DetailComponent, FlierComponent, OutletStoresComponent,
    CategoryComponent, TermsOfSaleComponent, TermsOfSaleEsComponent,
    HomeComponent, CouponComponent, OutletStores2Component, StoreLocationComponent]
})
export class AppModule { }
