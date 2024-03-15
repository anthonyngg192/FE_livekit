import { BaseHttpService } from '../base-http.service';
import { environment } from 'src/environments/environment';
import { FileModel } from 'src/app/models/storage/file.model';
import { Injectable } from '@angular/core';

@Injectable()
export class FileService extends BaseHttpService<FileModel> {
  protected baseUrl: string = environment.uploadUrl;
  // protected baseUrl: string = 'http://127.0.0.1:5015/admin/api';

  protected key = 'file';
  protected pluralKey = 'files';
}
