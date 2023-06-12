import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import {RouterModule} from "@angular/router";
import { StatusBarComponent } from './home/status-bar/status-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { IslandComponent } from './home/island/island.component';
import { DilemmaComponent } from './home/dilemma/dilemma.component';
import {NgOptimizedImage} from "@angular/common";
import { StatusBarMoneyComponent } from './home/status-bar-money/status-bar-money.component';
import { StatusBarCategoriesComponent } from './home/status-bar-categories/status-bar-categories.component';
import { StatusBarCategoriesFourComponent } from './home/dilemma/status-bar-categories-four/status-bar-categories-four.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeScreenComponent,
    HomeComponent,
    StatusBarComponent,
    IslandComponent,
    DilemmaComponent,
    StatusBarMoneyComponent,
    StatusBarCategoriesComponent,
    StatusBarCategoriesFourComponent,
    LandingPageComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatProgressBarModule,
        NgOptimizedImage
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
