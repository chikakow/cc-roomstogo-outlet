import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {LoadingService} from '../loading.service';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit {

  loading$: Subject<{loading: boolean, hasError: boolean, msg: string}>;

  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading;
  }

  ngOnInit() {
  }

}
