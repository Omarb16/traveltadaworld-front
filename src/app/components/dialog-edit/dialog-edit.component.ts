import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/types/user.type';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.scss'],
})
export class DialogEditComponent implements OnInit {
  constructor(
    private _dialogRef: MatDialogRef<DialogEditComponent, User>,
    @Optional() @Inject(MAT_DIALOG_DATA) private _user: User , private _router: Router
  ) {}

  /**
   * Returns person passed in dialog open
   */
  get user(): User {
    return this._user;
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
    this._router.navigate(['/profil']);
  }

  /**
   * Function to close the modal and send person to parent
   */
  onSave(user: any): void {
    this._dialogRef.close(user);
  }
}
