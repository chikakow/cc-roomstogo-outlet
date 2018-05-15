import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {LoadingService} from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();
    return next
      .handle(req)
      .do(event => {
        if (event instanceof HttpResponse) {
          this.loadingService.hide();
        }
      }, (err: any) => {
        this.loadingService.hide(true, `error occurred: ${err}`);
      });
  }
}
