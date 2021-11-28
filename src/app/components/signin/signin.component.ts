import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  file: File;

  constructor(private _userService: UserService, private _router: Router) {
    this.file = {} as File;
    this.form = new FormGroup({
      email: new FormControl('omar@gmail.com', [
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
      firstname: new FormControl('Omar', Validators.required),
      lastname: new FormControl('Bouayad', Validators.required),
      photo: new FormControl(null, Validators.required),
      birthDate: new FormControl(null, Validators.required),
      address: new FormControl('address', Validators.required),
      city: new FormControl('city', Validators.required),
      postalCode: new FormControl('9055', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      phone: new FormControl('+33610012939', [
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

  onFileChange(event: any) {
    this.file = {} as File;
    this.photo.setValue(null);
    this.photo.markAsTouched();
    this.file = event.target.files[0];
    this.photo.setValue('photo');
  }

  save() {
    if (this.form.valid) {
      var formData = new FormData();
      formData.append('data', JSON.stringify(this.form.value));
      if (this.file) formData.append('file', this.file, this.file.name);
      this._userService.signIn(formData).subscribe(
        (res) => {
          this._router.navigate(['/']);
        },
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

  get repassword(): FormControl {
    return <FormControl>this.form.get('repassword');
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
