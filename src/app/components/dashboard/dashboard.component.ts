import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/types/trip.type';
import {MatTableDataSource} from "@angular/material/table";

export interface PeriodicElement {
  destination: string;
  date: string;
  oragnisateur: string;
  etat: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {date: 'Jan 8, 2016', destination: "nancy", oragnisateur: 'H', etat: 'H'},
  {date: 'Jan 8, 2019', destination: "p", oragnisateur: 'He', etat: 'H'},
  {date: 'Jan 8, 2000', destination: "cas", oragnisateur: 'Li', etat: 'H'},
  {date: 'Jan 8, 2011', destination: "jj" ,oragnisateur: 'Be', etat: 'H'},
  { date: 'Jan 8, 2021', destination: "jjj", oragnisateur: 'B', etat: 'H'},
  { date: 'Jan 8, 2002', destination: "jjjjj", oragnisateur: 'C', etat: 'H'},
];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  _trips: Trip[];
  displayedColumns: string[] = ['date', 'destination', 'oragnisateur', 'etat'];
  myDataArray = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.myDataArray.filter = filterValue.trim().toLowerCase();
  }
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
