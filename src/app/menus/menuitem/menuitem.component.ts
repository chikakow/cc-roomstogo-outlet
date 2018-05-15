import {
  Component,
  ElementRef, HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { MenuItemDto } from '../../models/dtos/menuitem.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menuitem.component.html',
  styleUrls: ['./menuitem.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() item = <MenuItemDto>null; // see angular-cli issue #2034
  @Input() menuIndex: number;
  popupLeftPosition: number;

  mouseInPopup = false;
  mouseInItem = false;

  constructor(public menuService: MenuService,
              private renderer: Renderer2,
              private el: ElementRef,
              private router: Router) {

  }

  ngOnInit() {
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('click', ['$event'])
  onClick(event): void {
    const noSubmenu = (!this.item.submenu || !this.item.submenu.length || this.item.submenu.length === 0);

    event.stopPropagation();

    if (this.item.submenu) {
      if (this.menuService.isVertical) {
        this.mouseInPopup = !this.mouseInPopup;
      }
    }

    if (this.item.route) {
      if (this.menuService.isVertical && noSubmenu) {

        this.menuService.closeSideNav();
      } else if (!this.menuService.isVertical && noSubmenu) {
        this.menuService.closeAllSubmenu();
      }
      // this.router.navigate(['/' + this.item.route]);
    }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event): void {
    if (!this.menuService.isVertical) {
      this.mouseInItem = false;
    }
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('mouseenter')
  onMouseEnter(): void {

    if (!this.menuService.isVertical) {
      if (this.item.submenu) {
        // close other submenu;
        this.menuService.closeAllSubmenu();
        this.item.submenuOpen = true;
        this.mouseInItem = true;
        this.popupLeftPosition = this.menuIndex * 100 * -1;
      }
    }
  }

  onPopupMouseLeave() {

    if (!this.menuService.isVertical) {
      this.mouseInPopup = false;
    }
  }

  onPopupMouseEnter() {
    if (!this.menuService.isVertical) {
      this.mouseInPopup = true;
    }
  }

  get openSubmenu(): boolean {

    if (this.menuService.isVertical) {
      return (this.mouseInPopup || this.mouseInItem);
    } else {
      return (this.mouseInPopup || this.mouseInItem) && this.item.submenuOpen;
    }

  }

  get routeLink(): string {
    if (this.item.route) {
      return `/${this.item.route}`;
    }
    return '#';
  }
}
