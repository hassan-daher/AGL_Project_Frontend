import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryModel} from '../../../Models/CategoryModel';
import {LostAndFoundService} from '../../../Services/lost-and-found.service';
import {AuthenticationService} from '../../../app-auth/authentication.service';
import {LostItem} from '../../../Models/LostItem';

@Component({
  selector: 'app-add-lost-item-dialog',
  templateUrl: './add-lost-item-dialog.component.html',
  styleUrls: ['./add-lost-item-dialog.component.scss']
})
export class AddLostItemDialogComponent implements OnInit {
  selectedFiles: File[] = null;
  lostItemFormGroup: FormGroup;

  categories: Array<CategoryModel> = [
    {id: 2, name: 'Electronics'},
    {id: 3, name: 'Purses'},
    {id: 4, name: 'Keys'},
  ];

    constructor(private formBuilder: FormBuilder,
                public dialogRef: MatDialogRef<AddLostItemDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data,
              private lostAndFoundService: LostAndFoundService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.lostItemFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onUpload() {
    const fd = new FormData();
    let u;
    this.authService.currentUser.subscribe(x => {
      u = x;
      console.log(u);
    });
    fd.append('Name', this.lostItemFormGroup.get('name').value);
    fd.append('Description', this.lostItemFormGroup.get('description').value);
    fd.append('CategoryId', this.lostItemFormGroup.get('category').value);
    fd.append('UserId', u.user.id.toString());
    this.selectedFiles.forEach(x => {
      fd.append('img', x, x.name);
    });

    console.log('aaaa');
    console.log(fd);

    this.lostAndFoundService.addLostItem(fd).subscribe();
    this.dialogRef.close(fd);
  }

  onFileSelected(event) {
    console.log(event);
    this.selectedFiles = event.target.files as File[];
    console.log(this.selectedFiles);
    this.selectedFiles = Array.from(this.selectedFiles);
    console.log(Array.from(this.selectedFiles));
  }
}
