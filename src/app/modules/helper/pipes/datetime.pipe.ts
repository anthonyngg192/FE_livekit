import * as _ from 'lodash';
import * as moment from 'moment';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'datetime' })
export class DateTimePipe implements PipeTransform {
  transform(value: Date | moment.Moment | number | string, format = 'YYYY/MM/DD HH:mm') {
    // tslint:disable-next-line: radix
    let date = moment(_.isString(value) ? parseInt(value) : value);
    date = date.isValid() ? date : moment();
    return format ? date.format(format) : date.toDate();
  }
}
