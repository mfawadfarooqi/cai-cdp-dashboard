import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DateRangeServiceService {


  private startDateSubject = new BehaviorSubject<string | null>(null);
  private endDateSubject = new BehaviorSubject<string | null>(null);

  startSelectedDate = this.startDateSubject.asObservable();
  endSelectedDate = this.endDateSubject.asObservable();

  constructor() {
    // Load stored dates from sessionStorage if they exist
    const storedStartDate = sessionStorage.getItem('startDate');
    const storedEndDate = sessionStorage.getItem('endDate');

    if (storedStartDate && storedEndDate) {
      this.startDateSubject.next(storedStartDate);
      this.endDateSubject.next(storedEndDate);
    }

      // const now = new Date();
      // let endDate = now;
      // let startDate : Date = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      // startDate = this.adjustAndAddHours(startDate, 5);
      // endDate = this.adjustAndAddHours(endDate, 5);

      // this.setDateRange(startDate, endDate)
  }

  setDateRange(startDate: Date, endDate: Date): void {
    const startDateISOString = startDate.toISOString();
    const endDateISOString = endDate.toISOString();
    sessionStorage.setItem('startDate', startDateISOString);
    sessionStorage.setItem('endDate', endDateISOString);
    this.startDateSubject.next(startDateISOString);
    this.endDateSubject.next(endDateISOString);


  }

  private adjustAndAddHours(date: Date, hours: number): Date {
    // Adjust for local time zone and add the specified hours
    const localOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - localOffset + hours * 60 * 60 * 1000);
  }
}
