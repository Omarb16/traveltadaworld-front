import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { User } from 'src/app/types/user.type';
import { CustomValidators } from './custom-validators';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit , OnChanges {
  // private property to store model value
  private _model: User;
  // private property to store cancel$ value
  private readonly _cancel$: EventEmitter<void>;
  // private property to store submit$ value
  private readonly _submit$: EventEmitter<User>;
  // private property to store form value
  private readonly _form: FormGroup;

  constructor() {
    this._model = {} as User;
    this._submit$ = new EventEmitter<User>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
  }


  ngOnInit(): void {

  }
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
  get submit$(): EventEmitter<User> {
    return this._submit$;
  }

 
  /**
   * Function to handle component update
   */
  ngOnChanges(record: any): void {
    if (record.model && record.model.currentValue) {
      this._model = record.model.currentValue;
    } else {
      this._model = {
        photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        birthDate: '',
        address: '',
        city: '',
        postalCode: '',
        password: '',
        repassword: ' ',

    };
      // update form's values with model
    this._form.patchValue(this._model);
  }
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
  submit(user: User): void {
    this._submit$.emit(user);
  }


  /**
   * Function to build our form
   */
  private _buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(),
      photo: new FormControl(),
      firstname: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      entity: new FormControl(),
      email: new FormControl('', Validators.compose([
        Validators.required, CustomValidators.googleEmail
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('(0|\\+33)\\d{9}')
      ])),
      address: new FormGroup({
        street: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        postalCode: new FormControl('', Validators.required)
      }),
      isManager: new FormControl()
    });
  }
}
