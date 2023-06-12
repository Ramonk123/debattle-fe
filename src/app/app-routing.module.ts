import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeScreenComponent} from "./welcome-screen/welcome-screen.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./util/auth.guard";
import {DilemmaComponent} from "./home/dilemma/dilemma.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'welcome', component: LandingPageComponent},
  {path: 'login', component: WelcomeScreenComponent },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'dilemma/:category', component: DilemmaComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
