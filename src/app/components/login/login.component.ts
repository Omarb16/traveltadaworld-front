import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserLogged } from 'src/app/types/user-logged.type';
import { LoginUser } from 'src/app/types/login-user.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private _form: FormGroup;
  private _file: File;
  private _error: string;
  private _hide: boolean;

  constructor(private _userService: UserService, private _router: Router) {
    this._error = '';
    this._hide = true;
    this._file = {} as File;
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
    });
  }

  ngOnInit(): void {}

  get form(): FormGroup {
    return this._form;
  }
  get file(): File {
    return this._file;
  }
  get error(): string {
    return this._error;
  }
  get hide(): boolean {
    return this._hide;
  }

  save(): void {
    if (this._form.valid) {
      var user = this._form.value as LoginUser;
      this._userService.logIn(user).subscribe(
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

  onClick() {
    this._hide = !this._hide;
  }

  get email(): FormControl {
    return <FormControl>this._form.get('email');
  }

  get password(): FormControl {
    return <FormControl>this._form.get('password');
  }
}
