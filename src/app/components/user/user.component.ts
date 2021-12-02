import { environment } from './../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../types/user.type';
import { UserService } from '../../services/user.service';
import { TripDetail } from '../../types/trip-detail.type';
import { TripService } from '../../services/trip.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  private _user: User;
  private _id: string | null;

  constructor(
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute
  ) {
    this._user = {} as User;
    this._id = this._activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this._id) {
      this._userService.find(this._id).subscribe(
        (res: User) => {
          Object.assign(this._user, res);
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }

  get user(): User {
    return this._user;
  }
  get id(): string | null {
    return this._id;
  }
}
