import { ToasterService } from './services/toaster.service';
import { SocketService } from 'src/app/services/socket.service';
import { Component } from '@angular/core';
import {
  ISpinnerConfig,
  SPINNER_ANIMATIONS,
  SPINNER_PLACEMENT,
} from '@hardpool/ngx-spinner';
import { BusyService } from './services/busy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private _showSpinner: boolean;
  public _spinnerConfig: ISpinnerConfig;
  private _toasts: any[];

  constructor(
    private _busyService: BusyService,
    private _toasterService: ToasterService
  ) {
    this._toasts = [];
    this._showSpinner = false;
    this._spinnerConfig = {
      animation: SPINNER_ANIMATIONS.rotating_dots,
      placement: SPINNER_PLACEMENT.block_ui,
      size: '4rem',
      color: '#000000',
    };
    this._busyService.isLoading.subscribe((value) => {
      setTimeout(() => {
        this._showSpinner = value;
      }, 1);
    });
    this._toasterService.toast$.subscribe((toast) => {
      this._toasts = [toast, ...this._toasts];
      setTimeout(() => this._toasts.pop(), toast.delay);
    });
  }

  remove(index: number) {
    this._toasts = this._toasts.filter((v, i) => i !== index);
  }

  get showSpinner(): boolean {
    return this._showSpinner;
  }
  get spinnerConfig(): ISpinnerConfig {
    return this._spinnerConfig;
  }
  get toasts(): any[] {
    return this._toasts;
  }
}
