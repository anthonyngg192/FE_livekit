import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName',
})
export class FullNamePipe implements PipeTransform {
  transform(value: any) {
    return value ? `${value.firstName} ${value.lastName}` : '';
  }
}
