import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import { MenuService } from '../../services/menu.service';
import {MenuItemDto} from '../../models/dtos/menuitem.model';
import {UserService} from '../../services/user.service';
import {LocationDto} from '../../models/dtos/location.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public menuService: MenuService,
              private userService: UserService) {

    // this.subscription = this.userService.userLocation$
    //   .subscribe((loc: LocationDto) => {
    //     this.menuService.specialsMenuItems.forEach((menu: MenuItemDto) => {
    //       menu.route = menu.route + `/${loc.region}`;
    //     });
    //   });
  }

  ngOnInit() {


  }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }

  @HostListener('click', ['$event'])
  onClick(event): void {
    event.stopPropagation();
    this.menuService.closeSideNav();
  }

  navClicked(event) {
    event.stopPropagation();
  }

}
