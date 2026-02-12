import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-edit-team-name',
  imports: [FormsModule, MaterialModule],
  templateUrl: './edit-team-name.html',
  styleUrl: './edit-team-name.scss',
})
export class EditTeamName {
  data: { name: string } = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<EditTeamName>);
}
