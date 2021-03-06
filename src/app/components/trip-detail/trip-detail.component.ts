import { UserService } from 'src/app/services/user.service';
import { environment } from './../../../environments/environment';
import { SocketService } from './../../services/socket.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TripService } from './../../services/trip.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripDetail } from 'src/app/types/trip-detail.type';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Trip } from 'src/app/types/trip.type';
@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss'],
})
export class TripDetailComponent implements OnInit {
  private _trip: TripDetail;
  private _tripRecomm: Trip[];
  private _id: string | null;
  private _defaultImg: string;
  constructor(
    private _tripService: TripService,
    private _userService: UserService,
    private _notificationService: NotificationService,
    private _socketService: SocketService,
    private _activatedRoute: ActivatedRoute
  ) {
    this._trip = {} as TripDetail;
    this._defaultImg = environment.defaultImgTrip;
    this._tripRecomm = [] as Trip[];
    this._id = this._activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this._id) {
      this._tripService.findDetail(this._id).subscribe(
        (res: TripDetail) => {
          Object.assign(this._trip, res);
        },
        (err) => {
          console.error(err);
        }
      );
      this._tripService.findRecommandation(this._id).subscribe(
        (res: Trip[]) => {
          this._tripRecomm = res;
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }

  get userService(): UserService {
    return this._userService;
  }

  get trip(): TripDetail {
    return this._trip;
  }

  get defaultImg(): string {
    return this._defaultImg;
  }

  get tripRecomm(): Trip[] {
    return this._tripRecomm;
  }

  get id(): string | null {
    return this._id;
  }

  demand(item: any): void {
    const body = {
      name: localStorage.getItem('name'),
    };
    this._tripService.demand(item.id, body).subscribe(
      () => {
        this._trip.canDemand = false;
        this._trip.canCancel = true;
        const notif: any = {
          title: 'Demande cr??e',
          content: localStorage.getItem('name') + ' a fait une demande',
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

  cancel(item: any) {
    this._tripService.cancel(item.id).subscribe(
      () => {
        this._trip.canCancel = false;
        this._trip.canDemand = true;
        const notif: any = {
          title: 'Demande annul??e',
          content: localStorage.getItem('name') + ' a annul??e sa demande',
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

  //Telechargement pdf
  public makePdf() {
    var data = document.getElementById('content');
    // @ts-ignore
    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('ListeApprenant.pdf'); // Generated PDF
    });
  }
}
