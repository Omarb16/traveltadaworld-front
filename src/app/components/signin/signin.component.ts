import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogged } from 'src/app/types/user-logged.type';
import { User } from 'src/app/types/user.type';
import * as moment from 'moment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  private _form: FormGroup;
  private _file: File;
  private _hide: boolean;
  private _error: string;

  constructor(private _userService: UserService, private _router: Router) {
    this._file = {} as File;
    this._hide = true;
    this._error = '';
    this._form = new FormGroup({
      email: new FormControl('mclaughlin.cochran@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('aaAA12**', [
        Validators.required,
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        ),
      ]),
      repassword: new FormControl('aaAA12**', Validators.required),
      firstname: new FormControl('Mclaughlin', Validators.required),
      lastname: new FormControl('Cochran', Validators.required),
      photo: new FormControl(null, Validators.required),
      birthDate: new FormControl(null, Validators.required),
      address: new FormControl('address', Validators.required),
      city: new FormControl('Nancy', Validators.required),
      country: new FormControl('France', Validators.required),
      postalCode: new FormControl('54500', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      phone: new FormControl('+33610012739', [
        Validators.required,
        Validators.pattern('^[+]{1}[0-9]{10,12}$'),
      ]),
    });

    this.repassword.addValidators(this.checkPassword);
  }

  checkPassword(): ValidatorFn {
    return () => {
      const pass = this.password.value;
      const repass = this.repassword.value;
      let valid: boolean = false;
      if (pass === repass) valid = true;
      return valid ? null : { missMatch: true };
    };
  }

  ngOnInit(): void {}

  onFileChange(event: any): void {
    this._file = {} as File;
    this.photo.setValue(null);
    this.photo.markAsTouched();
    this._file = event.target.files[0];
    this.photo.setValue('photo');
  }

  onCLick(): void {
    this._hide = !this._hide;
  }

  save(): void {
    if (this._form.valid) {
      var formData = new FormData();
      var user = this._form.value;
      delete user.photo;
      user.birthDate = moment(this.birthDate.value).utc().format();
      for (const property in user) {
        if (user[property]) {
          formData.append(property, user[property]);
        }
      }
      if (this._file) formData.append('file', this._file, this._file.name);
      this._userService.signIn(formData).subscribe(
        (res: UserLogged) => {
          this._userService.loggedIn(res);
        },
        (err) => {
          console.error(err);
          this._error = err.error.message;
        }
      );
    }
  }

  get form(): FormGroup {
    return this._form;
  }

  get file(): File {
    return this._file;
  }

  get hide(): boolean {
    return this._hide;
  }

  get error(): string {
    return this._error;
  }

  get email(): FormControl {
    return <FormControl>this._form.get('email');
  }

  get password(): FormControl {
    return <FormControl>this._form.get('password');
  }

  get repassword(): FormControl {
    return <FormControl>this._form.get('repassword');
  }

  get firstname(): FormControl {
    return <FormControl>this._form.get('firstname');
  }

  get lastname(): FormControl {
    return <FormControl>this._form.get('lastname');
  }

  get address(): FormControl {
    return <FormControl>this._form.get('address');
  }

  get city(): FormControl {
    return <FormControl>this._form.get('city');
  }

  get postalCode(): FormControl {
    return <FormControl>this._form.get('postalCode');
  }

  get country(): FormControl {
    return <FormControl>this._form.get('country');
  }

  get phone(): FormControl {
    return <FormControl>this._form.get('phone');
  }

  get photo(): FormControl {
    return <FormControl>this._form.get('photo');
  }

  get birthDate(): FormControl {
    return <FormControl>this._form.get('birthDate');
  }

}
