import {Component, Input, OnInit} from '@angular/core';
import {LostItem} from '../../Models/LostItem';
import {LostAndFoundService} from '../../Services/lost-and-found.service';
import {Router} from '@angular/router';
import {ClaimItemDialogComponent} from '../dialogs/claim-item-dialog/claim-item-dialog.component';
import {MatDialog} from '@angular/material';
import {AuthenticationService} from '../../app-auth/authentication.service';
import {FacebookLoginWarningComponent} from '../dialogs/facebook-login-warning/facebook-login-warning.component';

@Component({
  selector: 'app-found-item',
  templateUrl: './found-item.component.html',
  styleUrls: ['./found-item.component.scss']
})
export class FoundItemComponent implements OnInit {

  @Input() lostItem: LostItem;
  loggedinByFB = false;
  constructor(private lostAndFoundService: LostAndFoundService, private router: Router, public dialog: MatDialog,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {

    this.loggedinByFB = this.authenticationService.getLoggedinByFB();
    console.log('aaaaa,', this.loggedinByFB);
  }

  claimItem(lostItemId) {
    const dialogRef = this.dialog.open(ClaimItemDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res === true) {
        this.lostAndFoundService.claimLostItem(lostItemId).subscribe(x => {
          location.reload();
        });
      }
    });

  }

  openFBWarning() {
    const dialogRef = this.dialog.open(FacebookLoginWarningComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe();
  }
}
