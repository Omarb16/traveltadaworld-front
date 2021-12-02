import { Notification } from './../../types/notification.type';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class ToasterComponent implements OnInit {
  private _toast: any;
  private _i: number;
  private readonly _remove$: EventEmitter<number>;

  constructor() {
    this._toast = null;
    this._i = 0;
    this._remove$ = new EventEmitter<number>();
  }

  @Input()
  set toast(model: any) {
    this._toast = model;
  }

  @Input()
  set i(model: number) {
    this._i = model;
  }

  @Output('remove') get remove$(): EventEmitter<number> {
    return this._remove$;
  }

  onClick(): void {
    this._remove$.emit(this._i);
  }

  get toast(): any {
    return this._toast;
  }

  ngOnInit(): void {}
}
