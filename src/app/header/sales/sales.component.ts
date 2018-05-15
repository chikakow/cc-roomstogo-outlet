import { Component, OnInit } from '@angular/core';
import {FixedHeaderService} from '../../services/fixed-header.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  expanded = false;

  constructor(private fixedHeaderService: FixedHeaderService) {

  }

  ngOnInit() {
  }

  expandCollapse () {
    this.expanded = !this.expanded;
    this.fixedHeaderService.setTotalHeight();
  }

}
