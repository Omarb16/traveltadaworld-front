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
  private _count: number;
  private _form: FormGroup;
  private _page: PageEvent;
  private _pageSize: number;
  private _trips: Trip[];

  constructor(private _tripService: TripService, private _routeur: Router) {
    this._trips = [];
    this._count = 0;
    this._pageSize = 8;
    this._page = {
      length: this._count,
      pageSize: this._pageSize,
      pageIndex: 0,
      previousPageIndex: 0,
    };
    this._form = new FormGroup({
      price: new FormControl(null),
      city: new FormControl(null),
      country: new FormControl(null),
      dateBegin: new FormControl(null),
      dateEnd: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this._tripService.count().subscribe(
      (res: number) => {
        this._count = res;
        this.find(this._page);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  get count(): number {
    return this._count;
  }
  get form(): FormGroup {
    return this._form;
  }
  get page(): PageEvent {
    return this._page;
  }
  get pageSize(): number {
    return this._pageSize;
  }
  get trips(): Trip[] {
    return this._trips;
  }

  navigate(id: string | undefined): void {
    this._routeur.navigate(['/trip', id]);
  }

  find(page: PageEvent) {
    if (this._form.valid) {
      var query: string = '?';
      const trip = this._form.value;
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
        'skip=' + page.pageIndex * this._pageSize + '&limit=' + page.pageSize;

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
