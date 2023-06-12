import {Component, OnInit} from '@angular/core';
import {StatusBarService} from "../../services/status-bar.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-status-bar-money',
  templateUrl: './status-bar-money.component.html',
  styleUrls: ['./status-bar-money.component.css']
})
export class StatusBarMoneyComponent implements OnInit {
  moneyStatus: number = 50;
  money$: Observable<number> = new Observable<number>();

  constructor(private statusBarService: StatusBarService) {}

  ngOnInit(): void {
    this.money$ = this.statusBarService.getMoneyStatus();
    this.money$.subscribe(amount => this.moneyStatus = amount);
    this.statusBarService.initializeProgress();
  }

  ngOnDestroy(): void {

  }

}
