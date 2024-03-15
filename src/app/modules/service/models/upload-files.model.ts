import * as _ from 'lodash';
import { BaseModel } from 'src/app/models/base/base.model';

export class UploadFilesModel extends BaseModel {
  files: string[];
  path: string;

  constructor(item = null) {
    super();
    _.assignIn(this, item);
  }
}
