import * as _ from 'lodash';
import * as resizebase64 from 'resize-base64';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { UploadFilesModel } from './models/upload-files.model';

@Injectable()
export class UploadService {
  constructor(
    private http: HttpClient,
    public httpService: HttpService,
  ) {}

  async uploadBase64(data: UploadFilesModel) {
    data.files = _.map(data.files, (x) => resizebase64(x, 800, 800) as string);
    return this.httpService.post(`${environment.uploadUrl}/file/upload`, data);
  }

  async upload(data: UploadFilesModel, options = null) {
    const base64Data = _.clone(data);

    if (base64Data.files !== undefined && base64Data.files.length > 0) {
      base64Data.files = _.filter<string>(base64Data.files, (file) => !file.includes('http://'));
      const uploadResult = await this.http
        .post(`${environment.uploadUrl}/file/upload`, base64Data, this.httpService.prepareSendRequest(options))
        .toPromise()
        .then((x) => JSON.parse(JSON.stringify(x)) as { fullPath: string }[])
        .catch(this.httpService.handleError.bind(this));

      data.files = _.filter<string>(data.files, (file) => file.includes('http://'));
      data.files = _.union(
        data.files,
        uploadResult.map((e) => e.fullPath),
      );
    }

    return data.files;
  }

  uploadFile(file: any, options = null) {
    const formData = new FormData();
    if (file.data && !_.isEmpty(file.data)) {
      Object.keys(file.data).map((key) => {
        formData.append(key, file.data[key]);
      });
    }
    formData.append(file.name, file.file);
    return this.http
      .post(`${environment.uploadUrl}/file/upload`, formData, this.httpService.prepareSendRequest(options))
      .subscribe(async (event) => {
        // eslint-disable-next-line @typescript-eslint/await-thenable
        const responseData = await event;
        if (file.onSuccess) {
          file.onSuccess(responseData, file.file);
        }
      }, this.httpService.handleError.bind(this));
  }
}
