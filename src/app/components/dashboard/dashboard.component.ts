import { Router } from '@angular/router';
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
  constructor(private _tripService: TripService, private _router: Router) {
    this._trips = [];
  }

  ngOnInit(): void {
    this._tripService.findUserTrips().subscribe(
      (res: Trip[]) => {
        this._trips = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  update(id: string) {
    this._router.navigate(['/update-trip', id]);
  }

  delete(id: string) {
    this._tripService.delete(id).subscribe(
      (res) => {
        this._trips = this._trips.filter((e) => e.id !== id);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
