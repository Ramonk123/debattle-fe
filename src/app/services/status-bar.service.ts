import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LogicalFileSystem} from "@angular/compiler-cli";

@Injectable({
  providedIn: 'root'
})
export class StatusBarService {
  private moneyStatus$: BehaviorSubject<number> = new BehaviorSubject<number>(50);
  private happinessStatus$: BehaviorSubject<number> = new BehaviorSubject<number>(30);
  private housingStatus$: BehaviorSubject<number> = new BehaviorSubject<number>(30);
  private climateStatus$: BehaviorSubject<number> = new BehaviorSubject<number>(30);
  private educationStatus$: BehaviorSubject<number> = new BehaviorSubject<number>(30);

  constructor(private http: HttpClient) {
  }


  public getMoneyStatus() {
    return this.moneyStatus$.asObservable();

  }

  public getHappinessStatus() {
    return this.happinessStatus$.asObservable();

  }

  public getHousingStatus() {
    return this.housingStatus$.asObservable();


  }

  public getClimateStatus() {
    return this.climateStatus$.asObservable();


  }

  public getEducationStatus() {
    return this.educationStatus$.asObservable();

  }

  public updateValue(category: string, amount: number) {
    switch (category) {
      case  'economy' :
        this.updateMoneyStatus(amount);
        break;
      case 'education' :
        this.updateEducationStatus(amount);
        break;
      case 'climate' :
        this.updateClimateStatus(amount);
        break;
      case 'housing' :
        this.updateHousingStatus(amount);
        break;
    }


  }

  private updateMoneyStatus(amount: number) {
    console.log('money ' + amount)
    const value = this.calculateDifference(this.moneyStatus$.value, amount);
    this.moneyStatus$.next(value);


  }

  private updateHappinessStatus(amount: number): void {
    console.log('happiness ' + amount)
    const newValue = this.calculateDifference(this.happinessStatus$.value, amount);
    this.happinessStatus$.next(newValue);
  }

  private updateClimateStatus(amount: number): void {
    console.log('climate ' + amount)
    const newValue = this.calculateDifference(this.climateStatus$.value, amount);
    this.climateStatus$.next(newValue);
  }

  private updateHousingStatus(amount: number): void {
    console.log('housing ' + amount)
    const newValue = this.calculateDifference(this.housingStatus$.value, amount);
    this.housingStatus$.next(newValue);
  }

  private updateEducationStatus(amount: number): void {
    console.log('educ ' + amount)
    const newValue = this.calculateDifference(this.educationStatus$.value, amount);
    this.educationStatus$.next(newValue);

  }

  private calculateDifference(current: number, change: number): number {
    let finalAmount = current + change;
    finalAmount = Math.max(0, Math.min(100, finalAmount));
    return finalAmount;
  }
}
