import { TripService } from 'src/app/services/trip.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/types/trip.type';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss'],
})
export class TripListComponent implements OnInit {
  form: FormGroup;
  _trips: Trip[];
  constructor(private _tripService: TripService) {
    this._trips = [];
    this.form = new FormGroup({
      title: new FormControl(null),
      city: new FormControl(null),
      country: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.find();
  }

  find() {
    if (this.form.valid) {
      var query: string = '?';
      const trip = this.form.value;
      for (const property in trip) {
        if (trip[property] && trip[property] != '') {
          query += property + '=' + trip[property] + '&';
        }
      }
      query = query.slice(0, query.length - 1);
      this._tripService.findAll(query).subscribe(
        (res: Trip[]) => {
          this._trips = res;
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }
}
