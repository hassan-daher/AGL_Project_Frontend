import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {LostAndFoundComponent} from './Components/lost-and-found/lost-and-found.component';
import {LoginComponent} from './Components/login/login.component';
import {NgZorroAntdModule, NzButtonModule, NzEmptyModule, NzIconModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './Components/home/home.component';
import {JwtModule} from '@auth0/angular-jwt';
import {errorInterceptorProvider} from './app-auth/error.interceptor';
import {jwtInterceptorProvider} from './app-auth/jwt.interceptor';
import {FoundItemComponent} from './Components/found-items/found-item.component';
import {AddLostItemDialogComponent} from './Components/dialogs/add-lost-item-dialog/add-lost-item-dialog.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CarouselModule} from 'ngx-bootstrap';
import {SafeHtmlPipe} from './Pipes/safe-html.pipe';
import {ClaimItemDialogComponent} from './Components/dialogs/claim-item-dialog/claim-item-dialog.component';
import {SignupComponent} from './Components/signup/signup.component';
import {AuthServiceConfig, FacebookLoginProvider, SocialLoginModule} from 'angularx-social-login';
import { FacebookLoginWarningComponent } from './Components/dialogs/facebook-login-warning/facebook-login-warning.component';
import { ResourcesComponent } from './Components/resources/resources.component';
import { AddDocumentComponent } from './Components/dialogs/add-document/add-document.component';

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('2376475802678284')
  }
]);

export function provideConfig() {
  return config;
}

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    LostAndFoundComponent,
    LoginComponent,
    HomeComponent,
    FoundItemComponent,
    AddLostItemDialogComponent,
    SafeHtmlPipe,
    ClaimItemDialogComponent,
    SignupComponent,
    FacebookLoginWarningComponent,
    ResourcesComponent,
    AddDocumentComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NzIconModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSidenavModule,
    AppRoutingModule,
    RouterModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    NgbModule,
    MatTabsModule,
    NzButtonModule,
    CarouselModule.forRoot(),
    MatDialogModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    NzEmptyModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: []
      }
    })

  ],
  entryComponents: [AddLostItemDialogComponent, ClaimItemDialogComponent, FacebookLoginWarningComponent, AddDocumentComponent],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }, errorInterceptorProvider, jwtInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}
