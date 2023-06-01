import {Component, Input, OnInit} from '@angular/core';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import {StatusBarService} from "../../services/status-bar.service";

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit{
  moneyProgressValue: number = 0;
  happinessProgressValue: number = 0; //Maybe overbodig
  climateProgressValue: number = 0; // Climate - Nature
  housingProgressValue: number = 0; // Housing
  educationProgressValue: number = 0; // Culture & education

  constructor(private statusBarService: StatusBarService) {}

  test(value: number) {
    console.log('pre')
    console.log(this.moneyProgressValue)
    console.log('test')
    this.statusBarService.updateMoneyStatus(value);
    console.log(this.moneyProgressValue)

  }

  ngOnInit(): void {
   this.statusBarService.getMoneyStatus().subscribe(value => this.moneyProgressValue = value);
   this.statusBarService.getHappinessStatus().subscribe(value => this.happinessProgressValue = value);
   this.statusBarService.getHousingStatus().subscribe(value => this.housingProgressValue = value);
   this.statusBarService.getClimateStatus().subscribe(value => this.climateProgressValue = value);
   this.statusBarService.getEducationStatus().subscribe(value => this.educationProgressValue = value);
  }

}

