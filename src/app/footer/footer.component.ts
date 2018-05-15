import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  outletStoreUrl = false;
  today = Date.now();

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.map(p=> {
      console.log('ac ro', p);
    });

  }

  ngOnInit() {

  }



}
