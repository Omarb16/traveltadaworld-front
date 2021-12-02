import { Notification } from './../../types/notification.type';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { faBell, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private _faBell: IconDefinition;
  private _countNotif: number;
  private _firstTime: boolean;
  private _notifs: Notification[];
  constructor(
    private _userService: UserService,
    private _notificationService: NotificationService
  ) {
    this._faBell = faBell;
    this._countNotif = 0;
    this._firstTime = true;
    this._notifs = [];
  }

  ngOnInit(): void {
    this.userService.countNotif$.subscribe(() => {
      this.getCountNotif();
    });
  }

  get faBell(): IconDefinition {
    return this._faBell;
  }
  get countNotif(): number {
    return this._countNotif;
  }
  get firstTime(): boolean {
    return this._firstTime;
  }
  get notifs(): Notification[] {
    return this._notifs;
  }

  getCountNotif(): void {
    this._notificationService.count().subscribe(
      (res) => {
        this._countNotif = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  get userService(): UserService {
    return this._userService;
  }

  logOut(): void {
    this._userService.logOut();
  }

  openNotif(): void {
    this._notificationService.find().subscribe(
      (res) => {
        this._notifs = res;
        this._countNotif = 0;
        if (this._firstTime) {
          this._firstTime = false;
          this._notifs.forEach((e: any) => {
            if (e.seen == false) {
              const n = {
                title: e.title,
                content: e.content,
                seen: e.seen,
                userId: e.userId,
                createdAt: e.createdAt,
              };
              this._notificationService.update(e.id, n).subscribe(
                (res) => {},
                (err) => {
                  console.error(err);
                }
              );
            }
          });
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }

  delete(id: string): void {
    this._notificationService.delete(id).subscribe(
      (res) => {
        this._notifs = this._notifs.filter((e) => e.id !== id);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
