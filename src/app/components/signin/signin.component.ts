import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/types/create-user.types';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  file: File;

  constructor(private _userService: UserService) {
    this.file = {} as File;
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        ),
      ]),
      repassword: new FormControl(null, [
        Validators.required,
        this.checkPassword(),
      ]),
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      photo: new FormControl(null, Validators.required),
      birthDate: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      postalCode: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('^+[0-9]{10,12}$'),
      ]),
    });
  }

  checkPassword() {
    return (form: FormControl) => {
      let valid: boolean = false;
      if (this.password.value === form.value) valid = true;
      return valid ? null : { missMatch: true };
    };
  }

  ngOnInit(): void {}

  onFileChange(event: any) {
    this.file = {} as File;
    this.photo.setValue(null);
    this.photo.markAsTouched();
    this.file = event.target.files[0];
    this.photo.setValue('photo');
  }

  save() {
    if (this.form.valid) {
      const user = this.form.value as User;
      this._userService.signIn(user).subscribe(
        (res) => {},
        (err) => {
          console.error(err);
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
}
