import { Component, Input, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.less'],
})
export class PageWrapperComponent {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() extra: TemplateRef<any>;

  constructor(
    private _location: Location
  ) { }

  onBack() {
    this._location.back();
  }
}
