import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { Trip } from 'src/app/types/trip.type';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { NotifiactionService } from 'src/app/services/notifiaction.service';
import { Notification } from '../../types/notification.type';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  defaultImg: string;
  _userTrips: Trip[];
  _travelerTrips: Trip[];
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
    private _notificationService: NotifiactionService,
    private _router: Router
  ) {
    this._travelerTrips = [];
    this._userTrips = [];
    this.defaultImg = environment.defaultImgTrip;
  }

  ngOnInit(): void {
    this._userTrips = [];
    this._travelerTrips = [];
    this._tripService.findUserTrips().subscribe(
      (res: Trip[]) => {
        this._userTrips = res;
      },
      (err) => {
        console.error(err);
      }
    );
    this._tripService.findTravelerTrips().subscribe(
      (res: Trip[]) => {
        this._travelerTrips = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  travlerFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //this._travelerTrips.filter = filterValue.trim().toLowerCase();
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
        const notif: Notification = {
          title: 'Demande annulée',
          content: localStorage.getItem('name') + ' a annulée sa demande',
          seen: false,
          userId: item.createdBy,
        };
        this._notificationService.create(notif).subscribe();
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
        const notif: Notification = {
          title: 'Demande accepté',
          content: localStorage.getItem('name') + ' a accepté votre demande',
          seen: false,
          userId: t.user,
        };
        this._notificationService.create(notif).subscribe();
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

        const notif: Notification = {
          title: 'Demande annulée',
          content: localStorage.getItem('name') + ' a rejeté votre demande',
          seen: false,
          userId: t.user,
        };
        this._notificationService.create(notif).subscribe();
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
