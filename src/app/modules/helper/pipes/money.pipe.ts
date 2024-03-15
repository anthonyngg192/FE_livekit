import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable()
@Pipe({
  name: 'money',
})
export class MoneyPipe implements PipeTransform {
  transform(value: number) {
    return value ? `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ` : '0 đ';
  }
}
