import {Component, OnInit} from '@angular/core';
import {RecoursecService} from '../../Services/recoursec.service';
import {DocumentModel} from '../../Models/DocumentModel';
import {AuthenticationService} from '../../app-auth/authentication.service';
import {FacebookLoginWarningComponent} from '../dialogs/facebook-login-warning/facebook-login-warning.component';
import {MatDialog} from '@angular/material';
import {AddDocumentComponent} from '../dialogs/add-document/add-document.component';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  constructor(private recoursecService: RecoursecService, private authService: AuthenticationService, public dialog: MatDialog) {
  }

  partialDocuments: DocumentModel[];
  finalsDocuments: DocumentModel[];
  quizzesDocuments: DocumentModel[];

  ngOnInit() {
    let u;
    this.authService.currentUser.subscribe(x => {
      u = x;
      console.log(u);
    });

    this.recoursecService.getPartialsDocument(u.user.id.toString()).subscribe(x => {
      this.partialDocuments = x;
    });

    this.recoursecService.getFinalsDocument(u.user.id.toString()).subscribe(x => {
      this.finalsDocuments = x;
    });

    this.recoursecService.getQuizzesDocument(u.user.id.toString()).subscribe(x => {
      this.quizzesDocuments = x;
    });
  }

  addPartialDocuments() {
    const dialogRef = this.dialog.open(AddDocumentComponent, {
      width: '500px',
      data: 6
    });
    dialogRef.afterClosed().subscribe();

  }

  addFinalsDocuments() {
    const dialogRef = this.dialog.open(AddDocumentComponent, {
      width: '500px',
      data: 5
    });
    dialogRef.afterClosed().subscribe();
  }

  addQuizzesDocuments() {
    const dialogRef = this.dialog.open(AddDocumentComponent, {
      width: '500px',
      data: 7
    });
    dialogRef.afterClosed().subscribe();
  }
}
