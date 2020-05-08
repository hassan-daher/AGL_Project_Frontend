import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {LostAndFoundService} from '../../../Services/lost-and-found.service';

@Component({
  selector: 'app-claim-item-dialog',
  templateUrl: './claim-item-dialog.component.html',
  styleUrls: ['./claim-item-dialog.component.scss']
})
export class ClaimItemDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ClaimItemDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private lostAndFoundService: LostAndFoundService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onReset() {
    this.dialogRef.close(true);
  }

}
