import { TripService } from '../../services/trip.service';
import { Trip } from '../../types/trip.type';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-trip',
  templateUrl: './form-trip.component.html',
  styleUrls: ['./form-trip.component.scss'],
})
export class FormTripComponent implements OnInit {
  // private property to store update mode flag
  private _isUpdateMode: boolean;
  // private property to store model value
  private _model: Trip;
  // private property to store cancel$ value
  private readonly _cancel$: EventEmitter<void>;
  // private property to store submit$ value
  private readonly _submit$: EventEmitter<Trip>;
  // private property to store form value
  private readonly _form: FormGroup;

  /**
   * Component constructor
   */
  constructor() {
    this._model = {} as Trip;
    this._isUpdateMode = false;
    this._submit$ = new EventEmitter<Trip>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
  }

  /**
   * Sets private property _model
   */
  @Input()
  set model(model: Trip) {
    this._model = model;
  }

  /**
   * Returns private property _model
   */
  get model(): Trip {
    return this._model;
  }

  /**
   * Returns private property _form
   */
  get form(): FormGroup {
    return this._form;
  }

  /**
   * Returns private property _cancel$
   */
  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  /**
   * Returns private property _submit$
   */
  @Output('submit')
  get submit$(): EventEmitter<Trip> {
    return this._submit$;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {}

  /**
   * Function to handle component update
   */
  ngOnChanges(record: any): void {
    if (record.model && record.model.currentValue) {
      this._model = record.model.currentValue;
      this._isUpdateMode = true;
    } else {
      this._model = {
        dateVoyage: 0,
        photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
        title: '',
        organisateur: ' ',
        description: '',
        destination: {
          pays: '',
          ville: '',
        },
      };
    }

    // update form's values with model
    this._form.patchValue(this._model);
  }

  /**
   * Function to emit event to cancel process
   */
  cancel(): void {
    this._cancel$.emit();
  }

  /**
   * Function to emit event to submit form and person
   */
  submit(trip: Trip): void {
    delete trip.photo;
    this._submit$.emit(trip);
  }

  /**
   * Function to build our form
   */
  private _buildForm(): FormGroup {
    return new FormGroup({
      title: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      description: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      photo: new FormControl(''),
      destination: new FormGroup({
        city: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
      }),
    });
  }

  get country(): FormControl {
    return <FormControl>this.form.get('destination')?.get('country');
  }

  get city(): FormControl {
    return <FormControl>this.form.get('destination')?.get('city');
  }

  get title(): FormControl {
    return <FormControl>this.form.get('title');
  }

  get photo(): FormControl {
    return <FormControl>this.form.get('photo');
  }

  get description(): FormControl {
    return <FormControl>this.form.get('description');
  }
}
