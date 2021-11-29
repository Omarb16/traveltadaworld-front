import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Trip } from 'src/app/types/trip.type';

@Component({
  selector: 'app-dialog-trip',
  templateUrl: './dialog-trip.component.html',
  styleUrls: ['./dialog-trip.component.scss'],
})
export class DialogTripComponent implements OnInit {
  constructor(
    private _dialogRef: MatDialogRef<DialogTripComponent, Trip>,
    @Optional() @Inject(MAT_DIALOG_DATA) private _trip: Trip
  ) {}

  /**
   * Returns person passed in dialog open
   */
  get trip(): Trip {
    return this._trip;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {}

  /**
   * Function to cancel the process and close the modal
   */
  onCancel(): void {
    this._dialogRef.close();
  }

  /**
   * Function to close the modal and send person to parent
   */
  onSave(trip: any): void {
    this._dialogRef.close(trip);
  }
}
