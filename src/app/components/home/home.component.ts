import { Component, OnInit } from '@angular/core';
import {Trip} from "../../types/trip.type";
import {TripService} from "../../services/trip.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private _trips: Trip[];
  form: FormGroup;

  constructor(private _tripService: TripService){
    this._trips = [];
    this.form = new FormGroup({
      price: new FormControl(null),
      city: new FormControl(null),
      country: new FormControl(null),
      dateBegin: new FormControl(null),
      dateEnd: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.find();

  }
  get trips(): Trip[] {
    return this._trips;
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
