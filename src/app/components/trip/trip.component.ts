import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {
  private _trip: any;
  private _defaultImg: string;
  constructor(private _router: Router) {
    this._trip = {};
    this._defaultImg = environment.defaultImgTrip;
  }

  ngOnInit(): void {}

  @Input()
  set trip(model: any) {
    this._trip = model;
  }

  get defaultImg(): string {
    return this._defaultImg;
  }

  more(id: string) {
    this._router.navigate(['/trip', id]);
  }
}
