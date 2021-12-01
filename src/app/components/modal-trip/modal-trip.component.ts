import { DialogTripComponent } from './../dialog-trip/dialog-trip.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from 'src/app/types/trip.type';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-modal-trip',
  templateUrl: './modal-trip.component.html',
  styleUrls: ['./modal-trip.component.scss'],
})
export class ModalTripComponent implements OnInit {
  private _personDialog:
    | MatDialogRef<DialogTripComponent, FormData>
    | undefined;
  _id: string | null;
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
      this._initModal(null);
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
  private _initModal(trip: any): void {
    // create modal with initial data inside
    this._personDialog = this._dialog.open(DialogTripComponent, {
      width: '500px',
      disableClose: true,
      data: trip,
    });

    this._personDialog.afterClosed().subscribe((res: any) => {
      if(res){
        if (res.isUpdate) {
          this._tripService.update(res.id, res.formData).subscribe(
            () => {
            },
            (err) => console.error(err),
            () => this._router.navigate(['/profil'])
          );
        } else {
          this._tripService.create(res.formData).subscribe(
            () => {
            },
            (err) => console.error(err),
            () => this._router.navigate(['/profil'])
          );

        }
      }
      else{
        this._router.navigate(['/profil']);
      }
    });
  }
}
