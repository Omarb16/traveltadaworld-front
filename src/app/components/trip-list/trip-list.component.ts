import { TripService } from 'src/app/services/trip.service';
import { FormControl, FormGroup } from '@angular/forms';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Trip } from 'src/app/types/trip.type';
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss'],
})
export class TripListComponent implements OnInit {
  form: FormGroup;
  private _trips: Trip[];
  private _view: string;





  constructor(private _tripService: TripService,private  _routeur:Router) {
    this._trips = [];
    this.form = new FormGroup({
      price: new FormControl(null),
      city: new FormControl(null),
      country: new FormControl(null),
      dateBegin: new FormControl(null),
  dateEnd: new FormControl(null),
    });
    this._view = 'list';

  }


  ngOnInit(): void {
    this.find();
   }

  get trips(): Trip[] {
    return this._trips;
  }

  set trips(value: Trip[]) {
    this._trips = value;
  }


  get view(): string {
    return this._view;
  }

  set view(value: string) {
    this._view = value;
  }

  navigate(id: string | undefined): void {
    this._routeur.navigate([ '/trip', id ]);
  }


  switchView(): void {
    this._view = (this._view === 'card') ? 'list' : 'card';
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

