import { FormGroup, NgForm } from '@angular/forms';
import { QueryModel } from 'src/app/models/base/query.model';
import { SortTypeEnum } from 'src/app/consts/common/sort-type.const';

export interface ResponseValidator {
  property: string;
  constraints: Record<string, string>;
}

export class HelperService {
  public static validateForm(form: NgForm | FormGroup) {
    for (const key of Object.keys(form.controls)) {
      form.controls[key].markAsDirty();
      form.controls[key].updateValueAndValidity();
    }
  }

  public static convertValidatorToError(validators: ResponseValidator[]) {
    const errors: Record<string, string> = {};

    (validators || []).forEach((validator) => {
      errors[validator.property] = this.parseError(validator.constraints);
    });

    return errors;
  }

  private static parseError(constraints: Record<string, string>) {
    if (!constraints) return;

    const key = Object.keys(constraints)[0];

    switch (key) {
      case 'isEnum':
        return constraints.isNotEmpty ? 'isNotEmpty' : constraints.isEnum;

      default:
        return key;
    }
  }

  public static sort(query: QueryModel, field: string, direction: string, func: () => void) {
    if (!direction) {
      query.sortBy = query.sortType = undefined;
    } else {
      query.sortBy = field;
      query.sortType = direction === 'ascend' ? SortTypeEnum.ASC : SortTypeEnum.DESC;
    }

    if (func) {
      func();
    }
  }
}
