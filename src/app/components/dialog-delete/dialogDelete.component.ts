import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-delete',
  templateUrl: 'dialogDelete.component.html',
})
export class DialogDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  delete(user: any): void {
    this.dialogRef.close(user);
  }
}
