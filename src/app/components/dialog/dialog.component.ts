import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/types/user.type';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  constructor(private _dialogRef: MatDialogRef<DialogComponent, User>, @Optional() @Inject(MAT_DIALOG_DATA) private _user: User) {
  }

  /**
   * Returns person passed in dialog open
   */
  get user(): User {
    return this._user;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
  }

  /**
   * Function to cancel the process and close the modal
   */
  onCancel(): void {
    this._dialogRef.close();
  }

  /**
   * Function to close the modal and send person to parent
   */
  onSave(user: User): void {
    this._dialogRef.close(user);
  }


}
