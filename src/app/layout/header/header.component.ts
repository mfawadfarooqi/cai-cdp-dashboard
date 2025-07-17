import {Component, ElementRef, inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {
  NgbCalendar,
  NgbDate,
  NgbDatepicker,
  NgbDropdown,
  NgbDropdownMenu,
  NgbDropdownToggle
} from '@ng-bootstrap/ng-bootstrap';
import {DateRangeServiceService} from '../../Services/genericComponentService/date-range-service.service';
import {AppLabelConstants} from '../../constants/AppLabelConstant';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    NgbDropdown,
    NgbDatepicker,
    NgbDropdownMenu,
    NgbDropdownToggle
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public labelContent = AppLabelConstants;
  calendar = inject(NgbCalendar);
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate = this.calendar.getToday();
  toDate: NgbDate | null = this.calendar.getNext(this.fromDate, 'd', 10);
  clickCount = 0;
  clickTimeout: any;
  title = 'Cydea Deception Platform';
  selectedRange: string;
  constructor( private dateRangeService: DateRangeServiceService,) {
  }
  ngOnInit() {
  }


  onDateSelection(date: NgbDate, dropdown: any) {
    this.clickCount++;

    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
    }

    this.clickTimeout = setTimeout(() => {
      if (this.clickCount === 2) {
        // Double-click: single day selection
        this.fromDate = date;
        this.toDate = null;

        const selectedDate = this.convertToDate(this.fromDate);
        const startDate = new Date(selectedDate.setHours(0, 0, 0, 0));
        const endDate = new Date(selectedDate.setHours(23, 59, 59, 999));

        const adjustedStart = this.adjustAndAddHours(startDate, 0);
        const adjustedEnd = this.adjustAndAddHours(endDate, 0);

        this.dateRangeService.setDateRange(adjustedStart, adjustedEnd);
        sessionStorage.removeItem('rangeValue');
        this.selectedRange = '';

        dropdown.close();

      } else {
        // Single click: normal range selection
        if (!this.fromDate && !this.toDate) {
          this.fromDate = date;
        } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
          this.toDate = date;
          this.applyCustomRange();
          dropdown.close();
        } else {
          this.fromDate = date;
          this.toDate = null;
        }
      }

      this.clickCount = 0; // reset click count
    }, 250); // 250ms is common double-click threshold
  }
  applyCustomRange(): void {
    if (this.fromDate && this.toDate) {
      const startDate = this.convertToDate(this.fromDate);
      const endDate = this.convertToDate(this.toDate);

      const adjustedStartDate = this.adjustAndAddHours(startDate, 0);
      const adjustedEndDate = new Date(endDate);
      adjustedEndDate.setHours(23, 59, 59, 999);

      // Convert adjustedEndDate to UTC manually if needed
      const adjustedEndDateUTC = new Date(
        adjustedEndDate.getTime() - adjustedEndDate.getTimezoneOffset() * 60000
      );

      this.dateRangeService.setDateRange(adjustedStartDate, adjustedEndDateUTC);
      sessionStorage.removeItem('rangeValue')
      this.selectedRange = ''
    }
  }

  private convertToDate(ngbDate: NgbDate): Date {
    return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
  }

  private convertToNgbDate(date: Date): NgbDate {
    return new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }

  private adjustAndAddHours(date: Date, hours: number): Date {
    const localOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - localOffset + hours * 60 * 60 * 1000);
  }

  preventDefault(event: Event) {
    event.preventDefault();
  }
  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }
  setPredefinedRange(range: string, dropdown: any): void {
    this.selectedRange = range;
    sessionStorage.setItem('rangeValue', this.selectedRange);
    const now = new Date();
    let startDate: Date;
    let endDate: Date;

    switch (range) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        break;

      case 'yesterday':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0);
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59, 999);
        break;

      case 'last7Days':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        break;

      case 'last30Days':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        break;

      case 'last90Days':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        break;

      case 'last1Year':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        break;

      case 'noFilter':
        startDate = new Date(now.getTime() - 1095 * 24 * 60 * 60 * 1000);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        break;

      default:
        return;
    }

    // Optionally adjust for time zone
    startDate = this.adjustAndAddHours(startDate, 0);
    endDate = this.adjustAndAddHours(endDate, 0);

    this.dateRangeService.setDateRange(startDate, endDate);
    dropdown.close();
  }
}
