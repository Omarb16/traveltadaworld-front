import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/types/trip.type';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  _trips: Trip[];
  constructor(private _tripService: TripService) {
    this._trips = [];
  }

  ngOnInit(): void {
    this._tripService.findAll().subscribe(
      (res: Trip[]) => {
        res.map((e, i) => Object.assign(e, res[i]));
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
