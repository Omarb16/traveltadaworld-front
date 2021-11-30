import { UserService } from './../../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/types/user.type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  private _user: User;
  defaultImg: string;
  constructor(private _router: Router, private _userService: UserService) {
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

  get user(): User {
    return this._user;
  }

  @Input()
  set user(value: User) {
    this._user = value;
  }
}
