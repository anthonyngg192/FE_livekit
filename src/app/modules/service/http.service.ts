import { HelperService } from '../helper/services/helper.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpStatusCode } from './types/http-status-code';
import { Injectable } from '@angular/core';
import { IResponse } from './../helper/models/IResponse';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SessionService } from './session.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HttpService {
  constructor(
    private http: HttpClient,
    private notification: NzNotificationService,
    private translate: TranslateService,
    private sessionService: SessionService,
  ) {}

  public async get<T>(url: string, options = null) {
    return this.http
      .get<IResponse>(url, this.prepareSendRequest(options))
      .toPromise()
      .then((x) => JSON.parse(JSON.stringify(x)) as IResponse<T>)
      .catch(this.handleError.bind(this));
  }

  public async post<T>(url: string, body: any, options: Record<string, any> = null) {
    return this.http
      .post(url, body, this.prepareSendRequest(options))
      .toPromise()
      .then((x) => JSON.parse(JSON.stringify(x)) as IResponse<T>)
      .catch(this.handleError.bind(this));
  }

  public async put<T>(url: string, body: any = {}, options = null) {
    return this.http
      .put(url, body, this.prepareSendRequest(options))
      .toPromise()
      .then((x) => JSON.parse(JSON.stringify(x)) as IResponse<T>)
      .catch(this.handleError.bind(this));
  }

  public async delete<T>(url: string, options = null): Promise<IResponse> {
    return this.http
      .delete(url, this.prepareSendRequest(options))
      .toPromise()
      .then((x) => JSON.parse(JSON.stringify(x)) as IResponse<T>)
      .catch(this.handleError.bind(this));
  }

  public async download(url: string, options = null, fileName: string): Promise<IResponse> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    options = this.prepareSendRequest(options);
    options.responseType = 'blob';
    return this.http
      .get(url, options)
      .toPromise()
      .then((x) => {
        self.downloadFile(x, fileName);
        return { data: null, statusCode: 0, message: null, validators: {} };
      })
      .catch(this.handleError.bind(this));
  }

  public prepareSendRequest(options: Record<string, any> = null) {
    const language = localStorage.getItem('language')
      ? localStorage.getItem('language')
      : this.translate.getDefaultLang();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Access-Control-Allow-Origin': 'true',
      'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,POST,PUT,OPTIONS',
      'Accept-Language': language,
    });
    options = options || { headers, responseType: 'json' };
    return options;
  }

  async handleError<T = any>(error: HttpErrorResponse): Promise<IResponse<T>> {
    let errorMessage = this.translate.instant('errorCodes-common');
    switch (error.status) {
      case HttpStatusCode.Unauthorized:
        this.sessionService.logout();
        break;

      case HttpStatusCode.Forbidden:
        errorMessage = (await error.error)?.message || errorMessage;

        this.notification.error(this.translate.instant('errorCodes-403'), '');
        break;

      default:
        errorMessage = (await error.error)?.message || errorMessage;
        this.notification.error(this.translate.instant('errorCodes-request'), errorMessage);
        break;
    }
    console.log(error);
    return {
      data: null,
      message: errorMessage,
      statusCode: -1,
      validators: HelperService.convertValidatorToError(error?.error?.validators || []),
    };
  }

  downloadFile(data, fileName = 'download.xlsx') {
    const url = window.URL.createObjectURL(data);
    const fileLink = document.createElement('a');
    fileLink.href = url;
    fileLink.download = fileName;
    fileLink.click();
  }
}
