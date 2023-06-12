import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StatusBarService {
  private moneyStatus$: BehaviorSubject<number> = new BehaviorSubject<number>(50);
  private housingStatus$: BehaviorSubject<number> = new BehaviorSubject<number>(30);
  private climateStatus$: BehaviorSubject<number> = new BehaviorSubject<number>(30);
  private educationStatus$: BehaviorSubject<number> = new BehaviorSubject<number>(30);

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

  public resetCurrentStatus(stats: any) {
    console.log(stats)
    this.moneyStatus$.next(stats.progress['economy']);
    this.housingStatus$.next(stats.progress['housing']);
    this.climateStatus$.next(stats.progress['climate']);
    this.educationStatus$.next(stats.progress['education']);

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
    finalAmount = Math.max(0, Math.min(100, finalAmount));
    return finalAmount;
  }

  public updateProgress(progress: any) {
    const id = localStorage.getItem('userId');
    const URL = environment.URL + `/user/${id}`;
    return this.http.post(URL, progress);

  }

  initializeProgress() {
    const userId = localStorage.getItem('userId');

    const URL = environment.URL + `/user/${userId}`;
    return this.http.get<any>(URL).subscribe(progress => {
      console.log(progress)
      this.climateStatus$.next(progress.progress.climate);
      this.moneyStatus$.next(progress.progress.economy);
      this.educationStatus$.next(progress.progress.education);
      this.housingStatus$.next(progress.progress.housing)
    });
  }
}
