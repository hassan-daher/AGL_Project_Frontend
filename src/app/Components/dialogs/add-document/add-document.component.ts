import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {LostAndFoundService} from '../../../Services/lost-and-found.service';
import {AuthenticationService} from '../../../app-auth/authentication.service';
import {RecoursecService} from '../../../Services/recoursec.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {

  documentFormGroup: FormGroup;
  selectedFiles: File[] = null;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AddDocumentComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private lostAndFoundService: LostAndFoundService,
              private authService: AuthenticationService,
              public recoursecService: RecoursecService) {
  }

  ngOnInit() {
    this.documentFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
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
    fd.append('Name', this.documentFormGroup.get('name').value);
    fd.append('Description', this.documentFormGroup.get('description').value);
    fd.append('CategoryId', this.data);
    fd.append('UserId', u.user.id.toString());
    this.selectedFiles.forEach(x => {
      fd.append('docs', x, x.name);
    });

    console.log('aaaa');
    console.log(fd);

    this.recoursecService.addDocument(fd).subscribe(x => {
      location.reload();
    });
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
