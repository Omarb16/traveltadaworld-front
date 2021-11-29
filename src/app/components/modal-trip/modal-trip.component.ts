import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { Trip } from 'src/app/types/trip.type';
import { TripService } from 'src/app/services/trip.service';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';

@Component({
  selector: 'app-modal-trip',
  templateUrl: './modal-trip.component.html',
  styleUrls: ['./modal-trip.component.scss'],
})
export class ModalTripComponent implements OnInit {
  private _personDialog: MatDialogRef<DialogEditComponent, Trip> | undefined;

  /**
   * Component constructor
   */
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _tripService: TripService,
    private _dialog: MatDialog
  ) {}

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
    // this._tripService.find(tripId).subscribe(
    //   (res: Trip) => {
    //     this._initModal(res);
    //   },
    //   (err) => {
    //     console.error(err);
    //   }
    // );
  }

  /**
   * Initialize modal process
   */
  private _initModal(trip: Trip): void {
    // create modal with initial data inside
    this._personDialog = this._dialog.open(DialogEditComponent, {
      width: '500px',
      disableClose: true,
      data: trip,
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._personDialog
      .afterClosed()
      .pipe(
        filter((trip: Trip | undefined) => !!trip),
        map((trip: Trip | undefined) => {
          return { create: trip };
        }),
        mergeMap((_: { create: any }) => {
          return this._tripService.create(_.create);
        })
      )
      .subscribe({
        next: () => {
          this._router.navigate(['/profil']);
        },
      });
  }
}
