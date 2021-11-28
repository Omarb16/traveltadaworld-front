import { Component, OnInit ,Input} from '@angular/core';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { User } from 'src/app/types/user.type';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  faUserEdit = faUserEdit;
  private _user : User;

  constructor(private _router: Router) {
    this._user={} as User;
  }

  ngOnInit(): void {}

  get user(): User{
    return this._user;
  }
  
  @Input()
  set user(value: User) {
    this._user = value;
  }
}
