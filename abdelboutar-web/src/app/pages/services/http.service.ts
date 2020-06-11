import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {EMPTY, Observable, of} from 'rxjs';
import {NameCodePair} from "../model/name-code-pair";
import {ES_RES_STATUS_ERR, ES_RES_STATUS_ERR_MSG, URL_SEPARATOR} from "../model/constants";
import {EsResponse} from "../model/es-response";


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private serviceUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    params: new HttpParams({}),
  };

  constructor(
    private httpClient: HttpClient
  ) {
    this.serviceUrl = 'http://localhost:8081';
  }

  get(endPoint: string, urlParams?: string | any, header?: NameCodePair[]): Observable<EsResponse> {
    this.resetHeader();
    const url = this.serviceUrl.concat(URL_SEPARATOR).concat(endPoint);
    if (urlParams) {
      this.httpOptions.params = new HttpParams({
        fromObject: urlParams
      });
    }
    if (header) {
      const headerList: NameCodePair[] = header;
      if (headerList.length > 0) {
        headerList.forEach((value: NameCodePair) => {
          this.httpOptions.headers = this.httpOptions.headers.append(value.code, value.name);
        });
      }
    }
    return this.httpClient.get<EsResponse>(url, this.httpOptions)
      .pipe(map((res: EsResponse) => {
        return res;
      }), catchError((err) => {
        this.logError(err);
        return of(new EsResponse(ES_RES_STATUS_ERR, err, ES_RES_STATUS_ERR_MSG));
      }));
  }

  post(endPoint: string, data: any, urlParams?: string | any, header?: NameCodePair[]): Observable<EsResponse> {
    this.resetHeader();
    const url = this.serviceUrl.concat(URL_SEPARATOR).concat(endPoint);
    if (urlParams) {
      this.httpOptions.params = new HttpParams({
        fromObject: urlParams
      });
    }
    if (header) {
      const headerList: NameCodePair[] = header;
      if (headerList.length > 0) {
        headerList.forEach((value: NameCodePair) => {
          this.httpOptions.headers = this.httpOptions.headers.append(value.code, value.name);
        });
      }
    }
    return this.httpClient.post<EsResponse>(url, data, this.httpOptions)
      .pipe(map((res: EsResponse) => {
        return res;
      }), catchError((err) => {
        this.logError(err);
        return of(new EsResponse(ES_RES_STATUS_ERR, err, ES_RES_STATUS_ERR_MSG));
      }));
  }

  put(endPoint: string, data: any, urlParams?: string | any, header?: NameCodePair[]): Observable<EsResponse> {
    this.resetHeader();
    const url = this.serviceUrl.concat(URL_SEPARATOR).concat(endPoint);
    if (urlParams) {
      this.httpOptions.params = new HttpParams({
        fromObject: urlParams
      });
    }
    if (header) {
      const headerList: NameCodePair[] = header;
      if (headerList.length > 0) {
        headerList.forEach((value: NameCodePair) => {
          this.httpOptions.headers = this.httpOptions.headers.append(value.code, value.name);
        });
      }
    }
    return this.httpClient.put<EsResponse>(url, data, this.httpOptions)
      .pipe(map((res: EsResponse) => {
        return res;
      }), catchError((err) => {
        this.logError(err);
        return of(new EsResponse(ES_RES_STATUS_ERR, EMPTY, ES_RES_STATUS_ERR_MSG));
      }));
  }

  patch(endPoint: string, data: any, sendFile?: boolean, urlParams?: string | any, header?: NameCodePair[]): Observable<EsResponse> {
    this.resetHeader();
    const url = this.serviceUrl.concat(URL_SEPARATOR).concat(endPoint);
    if (urlParams) {
      this.httpOptions.params = new HttpParams({
        fromObject: urlParams
      });
    }
    if (sendFile) {
      this.httpOptions.headers = new HttpHeaders({});
    } else {
      if (header) {
        const headerList: NameCodePair[] = header;
        if (headerList.length > 0) {
          headerList.forEach((value: NameCodePair) => {
            this.httpOptions.headers = this.httpOptions.headers.append(value.code, value.name);
          });
        }
      }
    }

    return this.httpClient.patch<EsResponse>(url, data, this.httpOptions)
      .pipe(map((res: EsResponse) => {
        return res;
      }), catchError((err) => {
        this.logError(err);
        return of(new EsResponse(ES_RES_STATUS_ERR, EMPTY, ES_RES_STATUS_ERR_MSG));
      }));
  }

  delete(endPoint: string, urlParams?: string | any, header?: NameCodePair[]): Observable<EsResponse> {
    this.resetHeader();
    const url = this.serviceUrl.concat(URL_SEPARATOR).concat(endPoint);
    if (urlParams) {
      this.httpOptions.params = new HttpParams({
        fromObject: urlParams
      });
    }
    if (header) {
      const headerList: NameCodePair[] = header;
      if (headerList.length > 0) {
        headerList.forEach((value: NameCodePair) => {
          this.httpOptions.headers = this.httpOptions.headers.append(value.code, value.name);
        });
      }
    }
    return this.httpClient.delete<EsResponse>(url, this.httpOptions)
      .pipe(map((res: EsResponse) => {
        return res;
      }), catchError((err) => {
        this.logError(err);
        return of(new EsResponse(ES_RES_STATUS_ERR, EMPTY, ES_RES_STATUS_ERR_MSG));
      }));
  }

  logError(err: any) {
    console.error(err);
  }

  private resetHeader() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams({}),
    };
  }
}
