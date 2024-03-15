import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, UntypedFormBuilder, ValidationErrors, Validator } from '@angular/forms';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LanguageModel } from 'src/app/models/base/language.model';
import { TranslateService } from '@ngx-translate/core';

enum FieldType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  HTML = 'html',
}

@Component({
  selector: 'multilang-field',
  templateUrl: 'multilang-field.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultilangFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MultilangFieldComponent),
      multi: true
    }
  ],
})
export class MultilangFieldComponent implements ControlValueAccessor, Validator {
  @Input() type: 'text' | 'textarea' | 'html' = 'text';
  @Input({ required: true }) name: string;
  @Input() rows = 3;
  @Input() span = 24;
  @Input() disabled = false;

  @Output() ngModelChange = new EventEmitter();

  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };
  innerValue = new LanguageModel();

  selectedLocale = this.translateService.langs[0];
  locales = this.translateService.langs;
  uploadUrl = `${environment.uploadUrl}/file/ckeditor?lang=${this.translateService.currentLang}`;
  currentLocale = this.translateService.currentLang;
  ckeditorConfig = {
    removePlugins: 'easyimage, cloudservices',
    font_names:
      'Quicksand;' +
      'QuicksandMedium;' +
      'Arial/Arial, Helvetica, sans-serif;' +
      'Comic Sans MS/Comic Sans MS, cursive;' +
      'Courier New/Courier New, Courier, monospace;' +
      'Georgia/Georgia, serif;' +
      'Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;' +
      'Tahoma/Tahoma, Geneva, sans-serif;' +
      'Times New Roman/Times New Roman, Times, serif;' +
      'Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;' +
      'Verdana/Verdana, Geneva, sans-serif;',
    filebrowserUploadUrl: this.uploadUrl,
    filebrowserImageUploadUrl: this.uploadUrl,
    language: this.currentLocale,
    toolbar: 'Cms',
    toolbar_Cms: [
      [
        'Bold',
        'Italic',
        'Underline',
        'Strikethrough',
        '-',
        'NumberedList',
        'BulletedList',
        '-',
        'Outdent',
        'Indent',
        'Blockquote',
        '-',
        'JustifyLeft',
        'JustifyCenter',
        'JustifyRight',
        'JustifyBlock',
        '-',
        'Image',
        'Table',
        'SpecialChar',
      ],
      ['Link', 'Unlink', 'Anchor', '-', 'Styles', 'Format', 'FontSize', 'TextColor', '-', 'Maximize', '-', 'Print'],
    ],
  };

  constructor(
    private readonly translateService: TranslateService,
    private fb: UntypedFormBuilder,
  ) {
  }

  validate(control: AbstractControl<any, any>): ValidationErrors {
    return null;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get isText() {
    return this.type === FieldType.TEXT;
  }

  get isTextarea() {
    return this.type === FieldType.TEXTAREA;
  }

  get isHTML() {
    return this.type === FieldType.HTML;
  }

  change() {
    this.onChangeCallback(this.innerValue);
  }

  switchLanguage() {
    this.selectedLocale =
      this.translateService.langs[(this.translateService.langs.indexOf(this.selectedLocale) + 1) % this.translateService.langs.length];
  }

  //From ControlValueAccessor interface
  writeValue(value: LanguageModel) {
    if (value !== this.innerValue) {
      this.innerValue = value || new LanguageModel();
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
