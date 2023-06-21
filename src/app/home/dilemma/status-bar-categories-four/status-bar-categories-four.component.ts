import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {StatusBarService} from "../../../services/status-bar.service";

@Component({
  selector: 'app-status-bar-categories-four',
  templateUrl: './status-bar-categories-four.component.html',
  styleUrls: ['./status-bar-categories-four.component.css']
})
export class StatusBarCategoriesFourComponent implements OnInit{
  housingStatus: number = 0;
  climateStatus: number = 0;
  educationStatus: number = 0;
  moneyStatus: number = 0;

  money$: Observable<number> = new Observable<number>();
  housing$: Observable<number> = new Observable<number>();
  climate$: Observable<number> = new Observable<number>();
  education$: Observable<number> = new Observable<number>();

  constructor(private statusBarService: StatusBarService) {}

  ngOnInit(): void {
    this.statusBarService.initializeProgress();
    this.statusBarService.getHousingStatus().subscribe(data => this.housingStatus = data)
    this.statusBarService.getEducationStatus().subscribe(data => this.educationStatus = data)
    this.statusBarService.getClimateStatus().subscribe(data => this.climateStatus = data)
    this.statusBarService.getMoneyStatus().subscribe(data => this.moneyStatus = data)
    // this.housing$ = this.statusBarService.getHousingStatus();
    // this.climate$ = this.statusBarService.getClimateStatus();
    // this.education$ = this.statusBarService.getEducationStatus();
    // this.money$ = this.statusBarService.getMoneyStatus();
    // this.housing$.subscribe(amount => this.housingStatus = amount);
    // this.climate$.subscribe(amount => this.climateStatus = amount);
    // this.education$.subscribe(amount => this.educationStatus = amount);
    // this.money$.subscribe(amount => this.moneyStatus = amount);

  }


}
