import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {StatusBarService} from "../../services/status-bar.service";

@Component({
  selector: 'app-status-bar-categories',
  templateUrl: './status-bar-categories.component.html',
  styleUrls: ['./status-bar-categories.component.css']
})
export class StatusBarCategoriesComponent implements OnInit {
  housingStatus: number = 50;
  climateStatus: number = 50;
  educationStatus: number = 50;

  housing$: Observable<number> = new Observable<number>();
  climate$: Observable<number> = new Observable<number>();
  education$: Observable<number> = new Observable<number>();

  constructor(private statusBarService: StatusBarService) {}
  ngOnInit(): void {
    this.housing$ = this.statusBarService.getHousingStatus();
    this.climate$ = this.statusBarService.getClimateStatus();
    this.education$ = this.statusBarService.getEducationStatus();
    this.housing$.subscribe(amount => this.housingStatus = amount);
    this.climate$.subscribe(amount => this.climateStatus = amount);
    this.education$.subscribe(amount => this.educationStatus = amount);
    this.statusBarService.initializeProgress();
  }


}
