import { TripService } from 'src/app/services/trip.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Trip } from 'src/app/types/trip.type';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss'],
})
export class TripListComponent implements OnInit {
  form: FormGroup;
  private _trips: Trip[];
  private _view: string;
  count: number;
  pageSize: number;
  page: PageEvent;

  constructor(private _tripService: TripService, private _routeur: Router) {
    this._trips = [];
    this.count = 0;
    this.pageSize = 8;
    this.page = {
      length: this.count,
      pageSize: this.pageSize,
      pageIndex: 0,
      previousPageIndex: 0,
    };
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
    this._tripService.count().subscribe(
      (res: number) => {
        this.count = res;
        this.find(this.page);
      },
      (err) => {
        console.error(err);
      }
    );
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
    this._routeur.navigate(['/trip', id]);
  }

  switchView(): void {
    this._view = this._view === 'card' ? 'list' : 'card';
  }

  find(page: PageEvent) {
    if (this.form.valid) {
      var query: string = '?';
      const trip = this.form.value;
      var added = false;
      for (const property in trip) {
        if (trip[property] && trip[property] != '') {
          if (property == 'dateBegin' || property == 'dateEnd') {
            trip[property] = moment(trip[property]).utc().format();
          }
          query += property + '=' + trip[property] + '&';
          added = true;
        }
      }
      query = query.slice(0, query.length - 1);
      if (!added) {
        query += '?';
      } else {
        query += '&';
      }
      query +=
        'skip=' + page.pageIndex * this.pageSize + '&limit=' + page.pageSize;

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
