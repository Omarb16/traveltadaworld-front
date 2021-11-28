import { TripService } from './../../services/trip.service';
import { Trip } from './../../types/trip.type';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss'],
})
export class TripFormComponent implements OnInit {
  form: FormGroup;
  file: File;
  id: string | null;

  constructor(
    private _tripService: TripService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    this.file = {} as File;
    this.form = new FormGroup({
      title: new FormControl('Title', Validators.required),
      description: new FormControl('Description', Validators.required),
      destination: new FormControl('Destination', Validators.required),
      photo: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    if (this.id) {
      this._tripService.find(this.id).subscribe(
        (res) => {},
        (err) => {
          console.error(err);
        }
      );
    }
  }

  onFileChange(event: any) {
    this.file = {} as File;
    this.photo.setValue(null);
    this.photo.markAsTouched();
    this.file = event.target.files[0];
    this.photo.setValue('photo');
  }

  save() {
    if (this.form.valid) {
      var trip = this.form.value as Trip;
      delete trip.photo;
      if (this.id) {
        this._tripService.update(this.id, trip).subscribe(
          (res) => {
            this._router.navigate(['/trip/:id']);
          },
          (err) => {
            console.error(err);
          }
        );
      } else {
        this._tripService.create(trip).subscribe(
          (res) => {
            this._router.navigate(['/trip/:id']);
          },
          (err) => {
            console.error(err);
          }
        );
      }
    }
  }

  get title(): FormControl {
    return <FormControl>this.form.get('title');
  }

  get description(): FormControl {
    return <FormControl>this.form.get('description');
  }

  get destination(): FormControl {
    return <FormControl>this.form.get('destination');
  }

  get photo(): FormControl {
    return <FormControl>this.form.get('photo');
  }
}
