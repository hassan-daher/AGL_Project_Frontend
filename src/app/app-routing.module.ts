import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {LostAndFoundComponent} from './Components/lost-and-found/lost-and-found.component';
import {LoginComponent} from './Components/login/login.component';
import {HomeComponent} from './Components/home/home.component';
import {AuthGuard} from './app-auth/auth.guard';
import {SignupComponent} from './Components/signup/signup.component';
import {ResourcesComponent} from './Components/resources/resources.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'lostAndFound', component: LostAndFoundComponent, canActivate: [AuthGuard] },
  { path: 'resources', component: ResourcesComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'lostAndFound', component: LostAndFoundComponent},
  // { path: 'resources', component: ResourcesComponent },
  // { path: 'home', component: HomeComponent },
  // { path: '',   redirectTo: '/money', pathMatch: 'full' },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
