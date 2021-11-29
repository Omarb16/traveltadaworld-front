import { DialogTripComponent } from './../dialog-trip/dialog-trip.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { defaultIfEmpty, filter, map, mergeMap } from 'rxjs';
import { Trip } from 'src/app/types/trip.type';
import { TripService } from 'src/app/services/trip.service';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';

@Component({
  selector: 'app-modal-trip',
  templateUrl: './modal-trip.component.html',
  styleUrls: ['./modal-trip.component.scss'],
})
export class ModalTripComponent implements OnInit {
  private _personDialog: MatDialogRef<DialogTripComponent, Trip> | undefined;
  _id: string | null;
  /**
   * Component constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _tripService: TripService,
    private _dialog: MatDialog
  ) {
    this._id = null;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
    this._id = this._activatedRoute.snapshot.paramMap.get('id');
    if (!this._id) {
      this._initModal({} as Trip);
    } else {
      this._tripService.find(this._id).subscribe(
        (res: Trip) => {
          this._initModal(res);
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }

  /**
   * Initialize modal process
   */
  private _initModal(trip: Trip): void {
    // create modal with initial data inside
    this._personDialog = this._dialog.open(DialogTripComponent, {
      width: '500px',
      disableClose: true,
      data: trip,
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._personDialog
      .afterClosed()
      .pipe(
        filter((trip: Trip | undefined) => !!trip),
        map((trip: any) => {
          const id = trip?.id;
          delete trip?.id;
          return { id, update: trip };
        }),
        mergeMap((_: { id: string | undefined; update: any }) => {
          if (_.id) {
            return this._tripService.update(_.id, _.update);
          } else {
            return this._tripService.create(_.update);
          }
        })
      )
      .subscribe({
        next: () => {
          this._router.navigate(['/profil']);
        },
      });
  }
}
