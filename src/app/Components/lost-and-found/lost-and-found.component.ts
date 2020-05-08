import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {LostItem} from '../../Models/LostItem';
import {LostAndFoundService} from '../../Services/lost-and-found.service';
import {MatDialog} from '@angular/material';
import {AddLostItemDialogComponent} from '../dialogs/add-lost-item-dialog/add-lost-item-dialog.component';
import {AuthenticationService} from '../../app-auth/authentication.service';
import {FacebookLoginWarningComponent} from '../dialogs/facebook-login-warning/facebook-login-warning.component';

@Component({
  selector: 'app-lost-and-found',
  templateUrl: './lost-and-found.component.html',
  styleUrls: ['./lost-and-found.component.scss']
})
export class LostAndFoundComponent implements OnInit, OnDestroy {

  subscriptions = [];
  myControl = new FormControl();
  lostItems: Array<LostItem>;
  searchClicked = false;
  loading;
  loggedinByFB;

  constructor(private lostAndFoundService: LostAndFoundService, public dialog: MatDialog,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.loggedinByFB = this.authenticationService.getLoggedinByFB();
    console.log(this.loggedinByFB);
    this.subscriptions.push(this.lostAndFoundService.getLostItems().subscribe(x => {
      this.lostItems = x;
      console.log(this.lostItems);
    }));
  }

  search() {
    this.searchClicked = true;
    this.loading = true;
    // this.httpService.getHistory(this.myControl.value.toString()).subscribe((res) => {
    //   this.history = res;
    //   this.loading = false;
    //   console.log(res);
    //   console.log(this.history);
    // });
    if (this.myControl.value && this.myControl.value !== '') {
      this.lostAndFoundService.getLostItemByName(this.myControl.value).subscribe(res => {
        this.lostItems = res;
      });
    }

  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  openFoundItemPopup() {
    const dialogRef = this.dialog.open(AddLostItemDialogComponent, {
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log(res);
        location.reload();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  onGoBackClick() {
    location.reload();
  }

  openFBWarning() {
    const dialogRef = this.dialog.open(FacebookLoginWarningComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe();
  }
}
