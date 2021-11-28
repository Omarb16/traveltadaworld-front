import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private _userService: UserService) {}

  ngOnInit(): void {}

  get userService() {
    return this._userService;
  }

  logOut() {
    this._userService.logOut();
  }
}
