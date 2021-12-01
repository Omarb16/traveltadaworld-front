import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/types/trip.type';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { NotificationService } from 'src/app/services/notification.service';
import { SocketService } from 'src/app/services/socket.service';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  sortUserTrips: Sort;
  sortTravelerTrips: Sort;
  pageUserTrips: PageEvent;
  pageTravelerTrips: PageEvent;
  defaultImg: string;
  _userTrips: Trip[];
  _travelerTrips: Trip[];
  countUserTrips: number;
  countTravelerTrips: number;
  pageSize: number;
  colTravelertrips: string[] = [
    'photo',
    'title',
    'createdBy',
    'description',
    'city',
    'country',
    'createdAt',
    'Annuler',
  ];
  colUserTrips: string[] = [
    'photo',
    'title',
    'travelers',
    'description',
    'city',
    'country',
    'createdAt',
    'Modifier',
    'Supprimer',
  ];

  constructor(
    private _tripService: TripService,
    private _notificationService: NotificationService,
    private _socketService: SocketService,
    private _router: Router
  ) {
    this._travelerTrips = [];
    this._userTrips = [];
    this.countTravelerTrips = 0;
    this.countUserTrips = 0;
    this.defaultImg = environment.defaultImgTrip;
    this.pageSize = 8;

    this.sortUserTrips = {
      active: 'createdAt',
      direction: 'desc',
    };
    this.sortTravelerTrips = {
      active: 'createdAt',
      direction: 'desc',
    };
    this.pageUserTrips = {
      length: this.countUserTrips,
      pageSize: this.pageSize,
      pageIndex: 0,
      previousPageIndex: 0,
    };
    this.pageTravelerTrips = {
      length: this.countTravelerTrips,
      pageSize: this.pageSize,
      pageIndex: 0,
      previousPageIndex: 0,
    };
  }
  ngOnInit(): void {
    this._tripService.countTravelerTrips().subscribe(
      (res: number) => {
        this.countTravelerTrips = res;
        this.findTravelerTrips(this.sortTravelerTrips, this.pageTravelerTrips);
      },
      (err) => {
        console.error(err);
      }
    );
    this._tripService.countUserTrips().subscribe(
      (res: number) => {
        this.countUserTrips = res;

        this.findUserTrips(this.sortUserTrips, this.pageUserTrips);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  findUserTrips(sort: Sort, page: PageEvent) {
    var query: string =
      '?active=' +
      sort.active +
      '&direction=' +
      sort.direction +
      '&skip=' +
      page.pageIndex * this.pageSize +
      '&take=' +
      page.pageSize;
    this._tripService.findUserTrips(query).subscribe(
      (res: Trip[]) => {
        this._userTrips = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  findTravelerTrips(sort: Sort, page: PageEvent) {
    var query: string =
      '?active=' +
      sort.active +
      '&direction=' +
      sort.direction +
      '&skip=' +
      page.pageIndex * this.pageSize +
      '&take=' +
      page.pageSize;
    this._tripService.findTravelerTrips(query).subscribe(
      (res: Trip[]) => {
        this._travelerTrips = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  update(id: string) {
    this._router.navigate(['/update-trip', id]);
  }

  delete(id: string) {
    this._tripService.delete(id).subscribe(
      (res) => {
        this._userTrips = this._userTrips.filter((e) => e.id !== id);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  cancel(item: any) {
    this._tripService.cancel(item.id).subscribe(
      (res) => {
        this._travelerTrips = this._travelerTrips.filter(
          (e) => e.id !== item.id
        );
        const notif: any = {
          title: 'Demande annulée',
          content: localStorage.getItem('name') + ' a annulée sa demande',
          seen: false,
          userId: item.createdBy,
        };
        this._notificationService.create(notif).subscribe();
        this._socketService.sendNotif(notif);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  accept(id: string, t: any) {
    this._tripService.accept(id, t.user).subscribe(
      (res) => {
        t.accept = true;
        const notif: any = {
          title: 'Demande accepté',
          content: localStorage.getItem('name') + ' a accepté votre demande',
          seen: false,
          userId: t.user,
        };
        this._notificationService.create(notif).subscribe();
        this._socketService.sendNotif(notif);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  decline(id: string, t: any, i: number) {
    this._tripService.decline(id, t.user).subscribe(
      (res) => {
        this._userTrips[i].travelers = this._userTrips[i].travelers.filter(
          (e) => e != t
        );

        const notif: any = {
          title: 'Demande annulée',
          content: localStorage.getItem('name') + ' a rejeté votre demande',
          seen: false,
          userId: t.user,
        };
        this._notificationService.create(notif).subscribe();
        this._socketService.sendNotif(notif);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
