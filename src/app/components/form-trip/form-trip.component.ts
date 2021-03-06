import { Trip } from '../../types/trip.type';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { UserService } from '../../services/user.service';
import { User } from '../../types/user.type';

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
  _country: String;

  private _file: File | null;
  /**
   * Component constructor
   */
  constructor(private _userService: UserService) {
    this._model = {} as Trip;
    this._country = '';
    const userId = this._userService.getIdUser();
    this._userService.find(userId).subscribe(
      (res: User) => {
        this._country = res.country;
      },
      (err) => {
        console.error(err);
      }
    );
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
      dateBegin: new FormControl('', Validators.required),
      dateEnd: new FormControl('', Validators.required),
      description: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
      detail: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      photo: new FormControl(''),
      city: new FormControl('', Validators.required),
      country: new FormControl(''),
    });
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
        photo: '',
        title: '',
        dateBegin: '',
        dateEnd: '',
        description: '',
        detail: '',
        price: 0,
        country: '',
        city: '',
        travelers: [],
      };
      this._isUpdateMode = false;
      this.photo.addValidators(Validators.required);
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

  onFileChange(event: any): void {
    this._file = null;
    this._file = event.target.files[0];
    if (!this.isUpdateMode) {
      this.photo.setValue('Done');
    }
  }

  /**
   * Function to emit event to submit form and person
   */
  submit(trip: any): void {
    var formData = new FormData();
    delete trip.photo;
    trip.dateBegin = moment(this.dateBegin.value).utc().format();
    trip.dateEnd = moment(this.dateEnd.value).utc().format();
    trip.country = this._country;
    if (this._isUpdateMode) {
      const id = trip.id;
      delete trip.id;
      formData.append('title', trip.title);
      formData.append('dateBegin', trip.dateBegin);
      formData.append('dateEnd', trip.dateEnd);
      formData.append('description', trip.description);
      formData.append('detail', trip.detail);
      formData.append('price', trip.price);
      formData.append('city', trip.city);
      formData.append('country', trip.country);
      const name = localStorage.getItem('name');
      if (name) formData.append('createdNameBy', name);
      if (this._file) formData.append('file', this._file, this._file.name);
      this._submit$.emit({ formData, id, isUpdate: true });
    } else {
      formData.append('title', trip.title);
      formData.append('dateBegin', trip.dateBegin);
      formData.append('dateEnd', trip.dateEnd);
      formData.append('description', trip.description);
      formData.append('detail', trip.detail);
      formData.append('price', trip.price);
      formData.append('city', trip.city);
      formData.append('country', trip.country);
      const name = localStorage.getItem('name');
      if (name) formData.append('createdNameBy', name);
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

  get detail(): FormControl {
    return <FormControl>this.form.get('detail');
  }
  get price(): FormControl {
    return <FormControl>this.form.get('price');
  }

  get dateBegin(): FormControl {
    return <FormControl>this.form.get('dateBegin');
  }
  get dateEnd(): FormControl {
    return <FormControl>this.form.get('dateEnd');
  }
}
