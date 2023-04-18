import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  [x: string]: any;
  constructor(private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }, private dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Fill all cells!',
        message: 'Please fill all cells before submitting the form.'
      }
    });
  } 

 

}

