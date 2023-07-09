/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';

import { CustomerDto } from '../models/customer-dto';
import { CustomerRm } from '../models/customer-rm';

@Injectable({ providedIn: 'root' })
export class CustomerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `listCustomer()` */
  static readonly ListCustomerPath = '/Customer';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listCustomer$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  listCustomer$Plain$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<CustomerRm>>> {
    const rb = new RequestBuilder(this.rootUrl, CustomerService.ListCustomerPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CustomerRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listCustomer$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listCustomer$Plain(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<CustomerRm>> {
    return this.listCustomer$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CustomerRm>>): Array<CustomerRm> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listCustomer()` instead.
   *
   * This method doesn't expect any request body.
   */
  listCustomer$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<CustomerRm>>> {
    const rb = new RequestBuilder(this.rootUrl, CustomerService.ListCustomerPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CustomerRm>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listCustomer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listCustomer(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<CustomerRm>> {
    return this.listCustomer$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CustomerRm>>): Array<CustomerRm> => r.body)
    );
  }

  /** Path part for operation `updateCustomer()` */
  static readonly UpdateCustomerPath = '/Customer';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCustomer()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateCustomer$Response(
    params?: {
      body?: CustomerDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, CustomerService.UpdateCustomerPath, 'put');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: '*/*', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCustomer$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  updateCustomer(
    params?: {
      body?: CustomerDto
    },
    context?: HttpContext
  ): Observable<void> {
    return this.updateCustomer$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `createCustomer()` */
  static readonly CreateCustomerPath = '/Customer';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCustomer()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createCustomer$Response(
    params?: {
      body?: CustomerDto
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, CustomerService.CreateCustomerPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: '*/*', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createCustomer$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createCustomer(
    params?: {
      body?: CustomerDto
    },
    context?: HttpContext
  ): Observable<void> {
    return this.createCustomer$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getCustomer()` */
  static readonly GetCustomerPath = '/Customer/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCustomer$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCustomer$Plain$Response(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<CustomerRm>> {
    const rb = new RequestBuilder(this.rootUrl, CustomerService.GetCustomerPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CustomerRm>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCustomer$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCustomer$Plain(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<CustomerRm> {
    return this.getCustomer$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CustomerRm>): CustomerRm => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCustomer()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCustomer$Response(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<CustomerRm>> {
    const rb = new RequestBuilder(this.rootUrl, CustomerService.GetCustomerPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CustomerRm>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCustomer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCustomer(
    params: {
      id: string;
    },
    context?: HttpContext
  ): Observable<CustomerRm> {
    return this.getCustomer$Response(params, context).pipe(
      map((r: StrictHttpResponse<CustomerRm>): CustomerRm => r.body)
    );
  }

}
