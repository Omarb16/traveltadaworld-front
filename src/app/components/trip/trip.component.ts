import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {
  @Input() trip: any = {};
  defaultImg: string;
  constructor(private _router: Router) {
    this.defaultImg = environment.defaultImgTrip;
  }

  ngOnInit(): void {}

  more(id: string) {
    this._router.navigate(['/trip', id]);
  }
}
