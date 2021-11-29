import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit {
  @Input() trip: any = {};
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  more(id: string) {
    this._router.navigate(['/trip', id]);
  }
}
