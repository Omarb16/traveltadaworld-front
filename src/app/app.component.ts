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
  public showSpinner: boolean;
  public spinnerConfig: ISpinnerConfig;

  constructor(private _busyService: BusyService) {
    this.showSpinner = false;
    this.spinnerConfig = {
      animation: SPINNER_ANIMATIONS.rotating_dots,
      placement: SPINNER_PLACEMENT.block_ui,
      size: '4rem',
      color: '#000000',
    };
    this._busyService.isLoading.subscribe((value) => {
      value ? (this.showSpinner = true) : (this.showSpinner = false);
    });
  }
}
