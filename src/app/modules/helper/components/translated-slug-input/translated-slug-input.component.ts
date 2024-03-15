import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslatedSlugModel } from 'src/app/models/base/slug.model';

@Component({
  selector: 'translated-slug-input',
  templateUrl: './translated-slug-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TranslatedSlugInputComponent),
      multi: true,
    },
  ],
})
export class TranslatedSlugInputComponent implements ControlValueAccessor {
  @Input() showPrefix = false;
  @Input() showPostfix = false;
  @Input({ required: true }) name: string;

  @Output() ngModelChange = new EventEmitter<TranslatedSlugModel>();
  innerValue = new TranslatedSlugModel();

  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: TranslatedSlugModel) => void = () => { };

  onChange() {
    this.onChangeCallback(this.innerValue);
  }
  //From ControlValueAccessor interface
  writeValue(value: TranslatedSlugModel) {
    if (value !== this.innerValue) {
      this.innerValue = value || new TranslatedSlugModel();
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
