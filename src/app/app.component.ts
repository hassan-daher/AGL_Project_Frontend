import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './app-auth/authentication.service';
import {AuthService} from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Students Community';

  constructor(private readonly auth: AuthenticationService, private readonly router: Router, private authService: AuthService) {
  }

  logout(): void {
    this.authService.signOut();
    this.auth.logout();



    this.router.navigate(['/login']);
  }


}
