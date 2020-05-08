import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../app-auth/authentication.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FacultyModel} from '../../Models/FacultyModel';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  faculties: FacultyModel[] = [
    {id: 1, name: 'Engineering'},
    {id: 2, name: 'Business'},
    {id: 3, name: 'Dental Laboratory'},
    {id: 4, name: 'Physiotherapy'},
    {id: 5, name: 'Physical Education'},
  ];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      birthday: ['', Validators.required],
      faculty: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    console.log(this.registerForm.value);
    this.authenticationService.signup(this.registerForm.value).subscribe(x => {
      this.loading = false;
      // this.authenticationService.login(this.registerForm.get('email').value, this.registerForm.get('password').value).subscribe();
      this.router.navigate(['login']);
    }, error1 => {
      this.loading = false;
    });


  }

}
