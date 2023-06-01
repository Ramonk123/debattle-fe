import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeScreenComponent} from "./welcome-screen/welcome-screen.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./util/auth.guard";
import {DilemmaComponent} from "./home/dilemma/dilemma.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: WelcomeScreenComponent },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'dilemma/:category', component: DilemmaComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
