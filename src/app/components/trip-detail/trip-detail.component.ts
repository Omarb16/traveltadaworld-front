import { TripService } from './../../services/trip.service';
import { Trip } from './../../types/trip.type';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'],
})
export class TripDetailComponent implements OnInit {
  _trip: Trip;
  _id: string | null;
  constructor(
    private _tripService: TripService,
    private _activatedRoute: ActivatedRoute
  ) {
    this._trip = {} as Trip;
    this._id = this._activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this._id) {
      this._tripService.find(this._id).subscribe(
        (res: Trip) => {
          Object.assign(this._trip, res);
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }
}
