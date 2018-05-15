import {Component, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { MenuService } from '../services/menu.service';
import {ScreenService} from '../services/screen.service';
import {LocationService} from '../services/location.service';
import {LocationDto} from '../models/dtos/location.model';
import {UserService} from '../services/user.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userZip: number;
  desktop = '_desktop';
  userState = 'GA';
  modalRef: BsModalRef;
  private subscriptions: Subscription[] = [];
  constructor(private screenService: ScreenService,
              public menuService: MenuService,
              private locationService: LocationService,
              private userService: UserService,
              private modalService: BsModalService) {

  }

  ngOnInit() {
    this.subscriptions.push(this.screenService.screenResizeIsLarge$.subscribe((isLarge: boolean) => {
      if (isLarge) {
        this.desktop = '_desktop';
      } else {
        this.desktop = '';
      }
    }));

   this.subscriptions.push(this.userService.userLocation$.subscribe((loc: LocationDto) => {
      if (loc && loc.state_iso_code) {
        this.userState = loc.state_iso_code;
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  saveLocation() {

    const rx = this.userZip.toString().match(/\b\d{5}\b/g);

    if (!rx || rx.length === 0) {
      console.error('zip not formated');
      return;
    }

    this.subscriptions.push(this.locationService.getLocationFromZip(this.userZip)
      .subscribe((location: LocationDto) => {
        if (location && location.region) {
          this.userService.setUserLocation(location);
        }
      }));

    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  get storeLocatorLink() {
    if (this.menuService.isVertical) {
      return 'https://m.roomstogo.com/storelocator/';
    }
    return 'https://www.roomstogo.com/storelocator';
  }
}
