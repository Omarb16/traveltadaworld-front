import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  private _year: string;
  constructor() {
    this._year = moment().format('YYYY');
  }

  ngOnInit(): void {}

  get year(): string {
    return this._year;
  }
}
