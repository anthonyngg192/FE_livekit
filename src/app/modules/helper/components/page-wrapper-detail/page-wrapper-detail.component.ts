import { Component, Input, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'page-wrapper-detail',
  templateUrl: './page-wrapper-detail.component.html',
  styleUrls: ['./page-wrapper-detail.component.less'],
})
export class PageWrapperDetailComponent {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() extra: TemplateRef<any>;

  constructor(private _location: Location) {}

  onBack() {
    this._location.back();
  }
}
