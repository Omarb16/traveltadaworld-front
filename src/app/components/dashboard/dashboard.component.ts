import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/types/trip.type';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  _userTrips: Trip[];
  _travelerTrips: Trip[];
  colTravelerrips: string[] = [
    'photo',
    'title',
    'createdBy',
    'description',
    'city',
    'country',
    'createdAt',
  ];
  colUserTrips: string[] = [
    'photo',
    'title',
    'travelers',
    'description',
    'city',
    'country',
    'createdAt',
  ];

  constructor(private _tripService: TripService, private _router: Router) {
    this._userTrips = [];
    this._travelerTrips = [];
  }

  ngOnInit(): void {
    // this._tripService.findUserTrips().subscribe(
    //   (res: Trip[]) => {
    //     this._userTrips = res;
    //   },
    //   (err) => {
    //     console.error(err);
    //   }
    // );
    // this._tripService.findTravelerTrips().subscribe(
    //   (res: Trip[]) => {
    //     this._travelerTrips = res;
    //   },
    //   (err) => {
    //     console.error(err);
    //   }
    // );
  }

  travlerFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //this._travelerTrips.filter = filterValue.trim().toLowerCase();
  }

  update(id: string) {
    this._router.navigate(['/update-trip', id]);
  }

  delete(id: string) {
    this._tripService.delete(id).subscribe(
      (res) => {
        this._userTrips = this._userTrips.filter((e) => e.id !== id);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  cancel(id: string) {
    this._tripService.cancel(id).subscribe(
      (res) => {
        this._travelerTrips = this._userTrips.filter((e) => e.id !== id);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
