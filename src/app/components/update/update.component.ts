import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { User } from 'src/app/types/user.type';
import { UserService } from 'src/app/services/user.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  private _personDialog: MatDialogRef<DialogComponent, User> | undefined;

  /**
   * Component constructor
   */
  constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService, private _dialog: MatDialog) {
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
    this._route.params
      .pipe(
        map((params: any) => params.id),
        mergeMap((id: string) => this._userService.find(id))
      )
      .subscribe((user: User) => this._initModal(user));
  }

  /**
   * Initialize modal process
   */
  private _initModal(user: User): void {
    // create modal with initial data inside
    this._personDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true,
      data: user
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._personDialog.afterClosed()
      .pipe(
        filter((user: User | undefined) => !!user),
        map((user: User | undefined) => {
          // get person id
          const id = user?.id;
          // delete obsolete attributes in original object which are not required in the API
          delete user?.id;
          

          return { id, update: user };
        }),
        mergeMap((_: { id: any, update: any }) => this._userService.update(_.id, _.update))
      )
      .subscribe({
          error: () => this._router.navigate(['/profil']),
          complete: () => this._router.navigate(['/profil'])
        }
      );
  }

}
