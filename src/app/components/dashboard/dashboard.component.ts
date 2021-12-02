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
  private _sortUserTrips: Sort;
  private _sortTravelerTrips: Sort;
  private _pageUserTrips: PageEvent;
  private _pageTravelerTrips: PageEvent;
  private _defaultImg: string;
  private _userTrips: Trip[];
  private _travelerTrips: Trip[];
  private _countUserTrips: number;
  private _countTravelerTrips: number;
  private _pageSize: number;
  private _colTravelertrips: string[];
  private _colUserTrips: string[];

  constructor(
    private _tripService: TripService,
    private _notificationService: NotificationService,
    private _socketService: SocketService,
    private _router: Router
  ) {
    this._colTravelertrips = [
      'photo',
      'title',
      'createdNameBy',
      'description',
      'city',
      'country',
      'createdAt',
      'Annuler',
    ];
    this._colUserTrips = [
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
    this._travelerTrips = [];
    this._userTrips = [];
    this._countTravelerTrips = 0;
    this._countUserTrips = 0;
    this._defaultImg = environment.defaultImgTrip;
    this._pageSize = 8;
    this._sortUserTrips = {
      active: 'createdAt',
      direction: 'desc',
    };
    this._sortTravelerTrips = {
      active: 'createdAt',
      direction: 'desc',
    };
    this._pageUserTrips = {
      length: this._countUserTrips,
      pageSize: this._pageSize,
      pageIndex: 0,
      previousPageIndex: 0,
    };
    this._pageTravelerTrips = {
      length: this._countTravelerTrips,
      pageSize: this._pageSize,
      pageIndex: 0,
      previousPageIndex: 0,
    };
  }
  ngOnInit(): void {
    this._tripService.countTravelerTrips().subscribe(
      (res: number) => {
        this._countTravelerTrips = res;
        this.findTravelerTrips(
          this._sortTravelerTrips,
          this._pageTravelerTrips
        );
      },
      (err) => {
        console.error(err);
      }
    );
    this._tripService.countUserTrips().subscribe(
      (res: number) => {
        this._countUserTrips = res;

        this.findUserTrips(this._sortUserTrips, this._pageUserTrips);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  get sortUserTrips(): Sort {
    return this._sortUserTrips;
  }
  get sortTravelerTrips(): Sort {
    return this._sortTravelerTrips;
  }
  get pageUserTrips(): PageEvent {
    return this._pageUserTrips;
  }
  get pageTravelerTrips(): PageEvent {
    return this._pageTravelerTrips;
  }
  get defaultImg(): string {
    return this._defaultImg;
  }
  get userTrips(): Trip[] {
    return this._userTrips;
  }
  get travelerTrips(): Trip[] {
    return this._travelerTrips;
  }
  get countUserTrips(): number {
    return this._countUserTrips;
  }
  get countTravelerTrips(): number {
    return this._countTravelerTrips;
  }
  get pageSize(): number {
    return this._pageSize;
  }
  get colTravelertrips(): string[] {
    return this._colTravelertrips;
  }
  get colUserTrips(): string[] {
    return this._colUserTrips;
  }

  findUserTrips(sort: Sort, page: PageEvent): void {
    var query: string =
      '?active=' +
      sort.active +
      '&direction=' +
      sort.direction +
      '&skip=' +
      page.pageIndex * this._pageSize +
      '&limit=' +
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

  findTravelerTrips(sort: Sort, page: PageEvent): void {
    var query: string =
      '?active=' +
      sort.active +
      '&direction=' +
      sort.direction +
      '&skip=' +
      page.pageIndex * this._pageSize +
      '&limit=' +
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

  update(id: string): void {
    this._router.navigate(['/update-trip', id]);
  }

  delete(id: string): void {
    this._tripService.delete(id).subscribe(
      (res) => {
        this._userTrips = this._userTrips.filter((e) => e.id !== id);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  cancel(item: any): void {
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

  accept(id: string, t: any): void {
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

  decline(id: string, t: any, i: number): void {
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
