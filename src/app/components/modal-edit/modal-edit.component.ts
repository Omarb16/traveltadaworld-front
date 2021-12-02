import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/types/user.type';
import { UserService } from 'src/app/services/user.service';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss'],
})
export class ModalEditComponent implements OnInit {
  private _personDialog:
    | MatDialogRef<DialogEditComponent, FormData>
    | undefined;

  /**
   * Component constructor
   */
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _dialog: MatDialog
  ) {}

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
    const userId = this._userService.getIdUser();
    this._userService.find(userId).subscribe(
      (res: User) => {
        this._initModal(res);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  /**
   * Initialize modal process
   */
  private _initModal(user: User): void {

    // create modal with initial data inside
    this._personDialog = this._dialog.open(DialogEditComponent, {
      width: '500px',
      disableClose: true,
      data: user,
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._personDialog.afterClosed().subscribe((res: any) => {
      if(res){
      this._userService
        .update(this._userService.getIdUser(), res)
        .subscribe((res2) => {
          this._router.navigate(['/profil']);
        });
    }
      else{
        this._router.navigate(['/profil']);
      }
    });
  }
}
