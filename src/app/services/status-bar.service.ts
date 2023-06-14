import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StatusBarService {
  private moneyStatus$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private housingStatus$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private climateStatus$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private educationStatus$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
  }


  public getMoneyStatus() {
    return this.moneyStatus$.asObservable();

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

  resetCurrentStatus() {
    let progressString = localStorage.getItem('progress');
    if (progressString) {
      const {progress, questionsAnswered} = JSON.parse(progressString!)
      this.climateStatus$.next(progress.climate);
      this.moneyStatus$.next(progress.economy);
      this.educationStatus$.next(progress.education);
      this.housingStatus$.next(progress.housing);
    }
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
    const value = this.calculateDifference(this.moneyStatus$.value, amount);
    this.moneyStatus$.next(value);


  }


  private updateClimateStatus(amount: number): void {
    const newValue = this.calculateDifference(this.climateStatus$.value, amount);
    this.climateStatus$.next(newValue);
  }

  private updateHousingStatus(amount: number): void {
    const newValue = this.calculateDifference(this.housingStatus$.value, amount);
    this.housingStatus$.next(newValue);
  }

  private updateEducationStatus(amount: number): void {
    const newValue = this.calculateDifference(this.educationStatus$.value, amount);
    this.educationStatus$.next(newValue);

  }

  private calculateDifference(current: number, change: number): number {
    let finalAmount = current + change;
    if (finalAmount < 0) {finalAmount = 0}
    else if (finalAmount > 100) {finalAmount = 100}
    return finalAmount;
  }

  public updateProgress(progress: any) {
    progress = {
      progress: {
        economy: this.moneyStatus$.value,
        education: this.educationStatus$.value,
        housing: this.housingStatus$.value,
        climate: this.climateStatus$.value
      },
      questionsAnswered: progress.questionsAnswered
    }
    console.log(progress)
    const userId = localStorage.getItem('userId');
    console.log(userId)
    const URL = environment.URL + `/user/${userId}`;
    this.http.post(URL, progress).subscribe(res => {
      console.log(res)
    });

  }

  initializeProgress() {
    const userId = localStorage.getItem('userId');

    const URL = environment.URL + `/user/${userId}`;
    this.http.get<any>(URL).subscribe(progress => {
      localStorage.setItem('progress', JSON.stringify(progress));
      this.climateStatus$.next(progress.progress.climate);
      this.moneyStatus$.next(progress.progress.economy);
      this.educationStatus$.next(progress.progress.education);
      this.housingStatus$.next(progress.progress.housing)
    });
  }
}
