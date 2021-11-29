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
  form: FormGroup;
  file: File;
  error: string;

  constructor(private _userService: UserService, private _router: Router) {
    this.error = '';
    this.file = {} as File;
    this.form = new FormGroup({
      email: new FormControl('Mclaughlin.Cochran@undefined.com', [
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

  save() {
    if (this.form.valid) {
      var user = this.form.value as LoginUser;
      this._userService.logIn(user).subscribe(
        (res: UserLogged) => {
          this._userService.loggedIn(res);
        },
        (err) => {
          console.error(err);
          this.error = err.error.message;
        }
      );
    }
  }

  get email(): FormControl {
    return <FormControl>this.form.get('email');
  }

  get password(): FormControl {
    return <FormControl>this.form.get('password');
  }
}
