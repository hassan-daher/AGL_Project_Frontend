import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationUser, AuthenticationService} from '../../app-auth/authentication.service';
import {first} from 'rxjs/operators';
import {AuthService, FacebookLoginProvider, SocialUser} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;

  loginForm: FormGroup;
  showSpinner = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('currentUser')));


    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // // reset login status
    // this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

    if (this.authenticationService.currentUserValue) {
      console.log(this.authenticationService.currentUserValue);
      this.router.navigate(['home']);
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.showSpinner = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.showSpinner = false;
          this.router.navigate(['home']);
          this.authenticationService.setLoggedinByFB(false);
        },
        error => {
          this.error = error;
          this.showSpinner = false;
        });

  }

  signup() {
    this.router.navigate(['signup']);
  }

  signInWithFB(): void {
    console.log('mikaaa');
    this.user = null;
    this.authService.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        this.loggedIn = (user != null);
        console.log(this.user);
        const u: ApplicationUser = {
          username: this.user.email,
          token: this.user.authToken,
          expiresIn: new Date()
        };
        this.authenticationService.setCurrentUserValue(u);
        this.authenticationService.setLoggedinByFB(true);

        if (JSON.parse(localStorage.getItem('currentUser'))) {
          console.log(this.authenticationService.currentUserValue);
          this.router.navigate(['resources']);
        }

      }

    });

    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.user = null;
    this.authService.signOut();
  }
}

