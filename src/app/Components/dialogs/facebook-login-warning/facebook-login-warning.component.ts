import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {LostAndFoundService} from '../../../Services/lost-and-found.service';

@Component({
  selector: 'app-facebook-login-warning',
  templateUrl: './facebook-login-warning.component.html',
  styleUrls: ['./facebook-login-warning.component.scss']
})
export class FacebookLoginWarningComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FacebookLoginWarningComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onReset() {
    this.dialogRef.close();
  }
}
