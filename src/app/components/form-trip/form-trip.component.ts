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
  private readonly _submit$: EventEmitter<any>;
  // private property to store form value
  private readonly _form: FormGroup;

  _file: File | null;
  /**
   * Component constructor
   */
  constructor() {
    this._model = {} as Trip;
    this._file = null;
    this._isUpdateMode = false;
    this._submit$ = new EventEmitter<FormData>();
    this._cancel$ = new EventEmitter<void>();
    this._form = new FormGroup({
      id: new FormControl(''),
      title: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      description: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      photo: new FormControl(''),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    });

    if (!this._isUpdateMode) {
      this.photo.addValidators(Validators.required);
    }
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
  get submit$(): EventEmitter<FormData> {
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
        id: '',
        photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
        title: '',
        description: '',
        country: '',
        city: '',
      };
      this._isUpdateMode = false;
    }

    // update form's values with model
    this._form.patchValue(this._model);
  }

  get isUpdateMode(): boolean {
    return this._isUpdateMode;
  }

  /**
   * Function to emit event to cancel process
   */
  cancel(): void {
    this._cancel$.emit();
  }

  onFileChange(event: any) {
    this._file = null;
    this.photo.setValue(null);
    this.photo.markAsTouched();
    this._file = event.target.files[0];
    this.photo.setValue('Done');
  }

  /**
   * Function to emit event to submit form and person
   */
  submit(trip: any): void {
    var formData = new FormData();
    delete trip.photo;
    if (this._isUpdateMode) {
      const id = trip.id;
      delete trip.id;
      formData.append('title', JSON.stringify(trip.title));
      formData.append('description', JSON.stringify(trip.description));
      formData.append('city', trip.desnation.city);
      formData.append('country', trip.country);
      if (this._file) formData.append('file', this._file, this._file.name);
      this._submit$.emit({ formData, id, isUpdate: true });
    } else {
      formData.append('title', JSON.stringify(trip.title));
      formData.append('description', JSON.stringify(trip.description));
      formData.append('city', trip.city);
      formData.append('country', trip.country);
      if (this._file) formData.append('file', this._file, this._file.name);
      this._submit$.emit({ formData, id: null, isUpdate: false });
    }
  }

  get country(): FormControl {
    return <FormControl>this.form.get('country');
  }

  get city(): FormControl {
    return <FormControl>this.form.get('city');
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
