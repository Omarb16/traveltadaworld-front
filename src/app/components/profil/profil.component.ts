import { Component, OnInit } from '@angular/core';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  faUserEdit = faUserEdit;

  constructor() {}

  ngOnInit(): void {}
}
