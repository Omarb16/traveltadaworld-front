import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, NgForm} from "@angular/forms";
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  _form : FormGroup;
  constructor(private _snackBar: MatSnackBar) {
    this._form = new FormGroup({
      object: new FormControl(''),
      text: new FormControl(''),
    })
  }

  openSnackBar(_form: FormGroup) {
    this._form.reset();
    this._snackBar.open("Votre message est envoyé", "avec succes!", {
      duration: 2000,
      // here specify the position
      verticalPosition: 'top'
    });

  }

  ngOnInit(): void {
      }

}
