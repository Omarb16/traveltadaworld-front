import { Notification } from './../../types/notification.type';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class ToasterComponent implements OnInit {
  @Input() toast: Notification;
  i: number;

  @Output() remove = new EventEmitter<number>();
  constructor() {
    this.toast = {} as Notification;
    this.i = 1000;
  }

  ngOnInit(): void {}
}
