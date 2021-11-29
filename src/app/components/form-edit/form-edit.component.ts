import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/types/user.type';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.scss'],
})
export class FormEditComponent implements OnInit, OnChanges {
  // private property to store model value
  private _model: User;
  // private property to store cancel$ value
  private readonly _cancel$: EventEmitter<void>;
  // private property to store submit$ value
  private readonly _submit$: EventEmitter<FormData>;
  // private property to store form value
  private readonly _form: FormGroup;

  _file: File | null;

  constructor(private _userService: UserService) {
    this._model = {} as User;
    this._file = null;
    this._submit$ = new EventEmitter<FormData>();
    this._cancel$ = new EventEmitter<void>();
    this._form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      description: new FormControl('', [Validators.minLength(10)]),
      photo: new FormControl(null),
      birthDate: new FormControl(null, Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postalCode: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[+]{1}[0-9]{10,12}$'),
      ]),
    });
    this.email.disable();
  }

  ngOnInit(): void {}
  /**
   * Sets private property _model
   */
  @Input()
  set model(model: User) {
    this._model = model;
  }

  /**
   * Returns private property _model
   */
  get model(): User {
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
   * Function to handle component update
   */
  ngOnChanges(record: any): void {
    if (record.model && record.model.currentValue) {
      this._model = record.model.currentValue;
      this._model.birthDate = moment(this._model.birthDate).utc().format();
    } else {
      this._model = {
        photo: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        birthDate: '',
        address: '',
        city: '',
        postalCode: '',
        description: '',
        password: '',
        repassword: '',
      };
      // update form's values with model
    }
    this._form.patchValue(this._model);
  }

  onFileChange(event: any) {
    this._file = null;
    this._file = event.target.files[0];
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
  submit(user: any): void {
    var formData = new FormData();
    delete user.photo;
    delete user.id;
    user.birthDate = moment(this.birthDate.value).utc().format();

    this._userService.changeName(user.lastname + ' ' + user.firstname);
    for (const property in user) {
      if (user[property]) {
        formData.append(property, user[property]);
      }
    }
    if (this._file) formData.append('file', this._file, this._file.name);
    this._submit$.emit(formData);
  }

  get email(): FormControl {
    return <FormControl>this.form.get('email');
  }

  get firstname(): FormControl {
    return <FormControl>this.form.get('firstname');
  }

  get lastname(): FormControl {
    return <FormControl>this.form.get('lastname');
  }

  get address(): FormControl {
    return <FormControl>this.form.get('address');
  }

  get city(): FormControl {
    return <FormControl>this.form.get('city');
  }

  get postalCode(): FormControl {
    return <FormControl>this.form.get('postalCode');
  }

  get phone(): FormControl {
    return <FormControl>this.form.get('phone');
  }

  get photo(): FormControl {
    return <FormControl>this.form.get('photo');
  }

  get birthDate(): FormControl {
    return <FormControl>this.form.get('birthDate');
  }

  get description(): FormControl {
    return <FormControl>this.form.get('description');
  }
}
