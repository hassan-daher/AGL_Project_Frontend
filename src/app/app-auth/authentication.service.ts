import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

export interface ApplicationUser {
  token: string;
  username: string;
  expiresIn: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loggedinByFB = false;

  baseUrl = environment.APIEndpoint;
  loginUrl = this.baseUrl + '/Auth/login';
  signupUrl = this.baseUrl + '/Auth/signup';

  public currentUserSubject: BehaviorSubject<ApplicationUser>;
  public currentUser: Observable<ApplicationUser>;

  constructor(private readonly http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<ApplicationUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public setCurrentUserValue(user) {
    console.log(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): ApplicationUser {
    return this.currentUserSubject.value;
  }

  public setLoggedinByFB(x) {
    this.loggedinByFB = x;
  }

  public getLoggedinByFB() {
    return this.loggedinByFB;
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.loginUrl, {username, password})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          console.log(user);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.currentUser = this.currentUserSubject.asObservable();
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    console.log(this.currentUserSubject);
  }

  signup(user): Observable<string> {
    console.log('user', user);
    return this.http.post<string>(this.signupUrl, user);
  }
}
