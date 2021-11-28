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
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  private _personDialog: MatDialogRef<DialogComponent, User> | undefined;

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
    this._personDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true,
      data: user,
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._personDialog
      .afterClosed()
      .pipe(
        filter((user: User | undefined) => !!user),
        map((user: User | undefined) => {
          delete user?.id;
          return { update: user };
        }),
        mergeMap((_: { update: any }) => {
          this._userService.changeName(
            _.update.lastname + ' ' + _.update.firstname
          );
          return this._userService.update(
            this._userService.getIdUser(),
            _.update
          );
        })
      )
      .subscribe({
        next: () => {
          this._router.navigate(['/profil']);
        },
      });
  }
}
