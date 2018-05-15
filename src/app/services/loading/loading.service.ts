import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class LoadingService {

  loading = new Subject<{loading: boolean, hasError: boolean, msg: string}>();

  constructor() { }

  hide(hasError: boolean = false, msg: string = '') {
    this.loading.next({
      loading: false, hasError: hasError, msg: msg
    });
  }
  show() {
    this.loading.next({
      loading: true, hasError: false, msg: ''
    });
  }

}
