import { UserService } from './../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/types/user.type';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../dialog-delete/dialogDelete.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  private _user: User;
  defaultImg: string;
  constructor(
    private _router: Router,
    private _userService: UserService,
    private dialog: MatDialog
  ) {
    this._user = {} as User;
    this.defaultImg = environment.defaultImgUser;
  }

  ngOnInit(): void {
    const userId = this._userService.getIdUser();
    this._userService.find(userId).subscribe(
      (res: User) => {
        Object.assign(this._user, res);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        const userId = this._userService.getIdUser();
        this._userService.delete(userId).subscribe(
          () => {},
          (err) => console.error(err),
          () => this._router.navigate(['/'])
        );
      } else {
        this._router.navigate(['/profil']);
      }
    });
  }

  get user(): User {
    return this._user;
  }

  @Input()
  set user(value: User) {
    this._user = value;
  }
}
