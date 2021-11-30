import { TripService } from './../../services/trip.service';
import { Trip } from './../../types/trip.type';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripDetail } from 'src/app/types/trip-detail.type';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'],
})
export class TripDetailComponent implements OnInit {
  _trip: TripDetail;
  _id: string | null;
  constructor(
    private _tripService: TripService,
    private _activatedRoute: ActivatedRoute
  ) {
    this._trip = {} as TripDetail;
    this._id = this._activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this._id) {
      this._tripService.findDetail(this._id).subscribe(
        (res: TripDetail) => {
          Object.assign(this._trip, res);
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }

  demand(id: string) {
    const body = {
      name: localStorage.getItem('name'),
    };
    this._tripService.demand(id, body).subscribe(
      () => {
        this._trip.canDemand = false;
        this._trip.canCancel = true;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  cancel(id: string) {
    this._tripService.cancel(id).subscribe(
      () => {
        this._trip.canCancel = false;
        this._trip.canDemand = true;
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
