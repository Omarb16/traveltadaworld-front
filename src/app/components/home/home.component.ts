import { Component, OnInit } from '@angular/core';
import { Trip } from '../../types/trip.type';
import { TripService } from '../../services/trip.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private _trips: Trip[];

  constructor(private _tripService: TripService) {
    this._trips = [];
  }

  ngOnInit(): void {
    this.find();
  }
  get trips(): Trip[] {
    return this._trips;
  }

  find() {
    this._tripService.findFirstTree().subscribe(
      (res: Trip[]) => {
        this._trips = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
