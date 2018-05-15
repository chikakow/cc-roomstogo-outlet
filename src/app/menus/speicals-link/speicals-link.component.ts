import { Component, OnInit } from '@angular/core';
import {MenuService} from '../../services/menu.service';

@Component({
  selector: 'app-speicals-link',
  templateUrl: './speicals-link.component.html',
  styleUrls: ['./speicals-link.component.scss']
})
export class SpeicalsLinkComponent implements OnInit {

  constructor(public menuService: MenuService) { }

  ngOnInit() {
  }

}
