import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {StatusBarService} from "../../services/status-bar.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit{
  public progressValue: number = 0;

  public oldValue: number = 0;
  @Input() category: string = ''.toLowerCase();
  private statusValue$: Observable<number> = new Observable();

  constructor(private statusBarService: StatusBarService) {
  }


  ngOnInit(): void {
    this.retrieveObservable(this.category);
    this.statusValue$.subscribe(value => this.progressValue = value)
  }




  private retrieveObservable(category: string) {
    switch (category) {
      case 'economy' :
        this.statusValue$ = this.statusBarService.getMoneyStatus();
        break;
      case 'housing' :
        this.statusValue$ = this.statusBarService.getHousingStatus();
        break;
      case 'climate' :
        this.statusValue$ = this.statusBarService.getClimateStatus();
        break;
      case 'education' :
        this.statusValue$ = this.statusBarService.getEducationStatus();
        break;
    }

  }

  // public setSubjectValue(amount: number) {
  //   switch (this.category) {
  //     case 'economy' :
  //      this.statusBarService.updateMoneyStatus(amount);
  //       break;
  //     case 'housing' :
  //       this.statusBarService.updateHousingStatus(amount);
  //       break;
  //     case 'climate' :
  //       this.statusBarService.updateClimateStatus(amount);
  //       break;
  //     case 'education' :
  //       this.statusBarService.updateEducationStatus(amount);
  //       break;
  //
  //   }
  //
  // }

}

