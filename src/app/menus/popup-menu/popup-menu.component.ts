import {Component, Input, OnInit} from '@angular/core';
import {MenuService} from '../../services/menu.service';
import {MenuItemDto} from '../../models/dtos/menuitem.model';

@Component({
  selector: 'app-popup-menu',
  templateUrl: './popup-menu.component.html',
  styleUrls: ['./popup-menu.component.scss']
})
export class PopupMenuComponent implements OnInit {

  @Input() menu: Array<MenuItemDto>;
  @Input() submenuLink: string;

  constructor(public menuService: MenuService) { }

  ngOnInit() {
  }

}
