import { Injectable } from '@angular/core';
import {
  Http,
  ConnectionBackend,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  Headers,
  Request
} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment';

// not being used since angular 4.3 introduced httpclient from @angular/common/httpclient we need to extend from that class if we want to use this.
// we are using httpclient at this time and it does job and servces httpinterceptor for loadingservice.
@Injectable()
export class HttpService extends Http {

  constructor(backend: ConnectionBackend,
              defaultOptions: RequestOptions,
  ) {
    super(backend, defaultOptions);
  }

  /**
   * Performs any type of http request.
   * @param url
   * @param options
   * @returns {Observable<Response>}
   */
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options);
  }

  /**
   * Performs a request with `get` http method.
   * @param url
   * @param options
   * @returns {Observable<>}
   */
  getLocal(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.requestInterceptor();
    return super.get(this.getFullUrl(url), this.requestOptions(options))
      .catch(this.onCatch.bind(this))
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.requestInterceptor();
    return super.get(url, this.requestOptions(options))
      .catch(this.onCatch.bind(this))
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  /**
   * Performs a request with `post` http method.
   * @param url
   * @param body
   * @param options
   * @returns {Observable<>}
   */
  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.requestInterceptor();
    return super.post(this.getFullUrl(url), body, this.requestOptions(options))
      .catch(this.onCatch.bind(this))
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  /**
   * Performs a request with `put` http method.
   * @param url
   * @param body
   * @param options
   * @returns {Observable<>}
   */
  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.requestInterceptor();
    return super.put(this.getFullUrl(url), body, this.requestOptions(options))
      .catch(this.onCatch.bind(this))
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  /**
   * Performs a request with `delete` http method.
   * @param url
   * @param options
   * @returns {Observable<>}
   */
  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.requestInterceptor();
    return super.delete(this.getFullUrl(url), this.requestOptions(options))
      .catch(this.onCatch.bind(this))
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }


  /**
   * Request options.
   * @param options
   * @returns {RequestOptionsArgs}
   */
  private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }

    if (options.headers == null) {
      const hdrs = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });

      options.headers = this.appendAuthorizationToHeader(hdrs);
    }

    return options;
  }

  // TODO: chikako when we need auth for request uncomment below. Code is already cleaned up.
  private appendAuthorizationToHeader(headers: Headers) {
    // const user = StorageHelper.getLocal('user') !== undefined ? JSON.parse(localStorage.getItem('user')) : null;
    // if (user) {
    //   headers.append('X-Spree-Token', user.spree_api_key);
    // }
    // const token = StorageHelper.getLocal('tokens');
    // if (token) {
    //   headers.append('Authorization', `Bearer ${token}`);
    // }
    return headers;
  }

  /**
   * Build API url.
   * @param url
   * @returns {string}
   */
  private getFullUrl(url: string): string {
    return environment.API_ENDPOINT + url;
  }

  /**
   * Request interceptor.
   */
  private requestInterceptor(): void {
    console.log('Sending Request');
  }

  /**
   * Response interceptor.
   */
  private responseInterceptor(): void {
    console.log('Request Complete');
  }

  /**
   * Error handler.
   * @param error
   * @param caught
   * @returns {ErrorObservable}
   */
  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    console.log('Something went terrible wrong and error is', error);
    // this.loaderService.popError();
    return Observable.of(error);
  }

  /**
   * onSubscribeSuccess
   * @param res
   */
  private onSubscribeSuccess(res: Response): void {
    // this.loading.next({
    //   loading: false, hasError: false, hasMsg: ''
    // });
  }

  /**
   * onSubscribeError
   * @param error
   */
  private onSubscribeError(error: any): void {
    console.log('Something Went wrong while subscribing', error);
    // // this.loaderService.popError();
    // this.loading.next({
    //   loading: false, hasError: true, hasMsg: 'Something went wrong'
    // });
  }

  /**
   * onFinally
   */
  private onFinally(): void {
    this.responseInterceptor();
  }
}

export const RequestHelper = {

  extractList(response: Response) {
    const body = response.json();
    const object = Object.keys(body)[0];
    return body[object] || [];
  },

  extractObject(response: Response) {
    const list = RequestHelper.extractList(response);
    return list.length ? list[0] : {};
  },

  extractData(response: Response) {
    const body = response.json();
    return body || {};
  },

  handleError(error: Response | any) {
    // TODO: chi implement remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '',
        err = body.error || JSON.stringify(body);

      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
  }

};
