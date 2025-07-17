import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AppLabelConstants} from "../../../constants/AppLabelConstant";
import {NgForOf} from "@angular/common";
import {RouterLink, RouterLinkActive} from '@angular/router';
import {SortingService} from '../../../Services/genericComponentService/sorting.service';
import {DashboardService} from '../../../Services/pagesService/dashboard.service';
import {Subscription} from 'rxjs';
import {DateRangeServiceService} from '../../../Services/genericComponentService/date-range-service.service';



@Component({
  selector: 'app-recent-incidents',
  standalone: true,
  imports: [
    NgForOf,

  ],
  templateUrl: './recent-incidents.component.html',
  styleUrl: './recent-incidents.component.css'
})
export class RecentIncidentsComponent implements OnInit , OnDestroy{
  investigationData: any
  protected readonly labelContent = AppLabelConstants;
  private dateRangeSubscription: Subscription = new Subscription();

constructor(   private sortingService: SortingService, private dashboardService: DashboardService,
               private dateService: DateRangeServiceService,) {
}

ngOnInit() {
  this.dateRangeSubscription = this.dateService.endSelectedDate.subscribe(endDate => {
    this.getAllCounts(); // Pass your dates here
  });
}

  getAllCounts(): void {
    const endDate = sessionStorage.getItem('endDate')
    const startDate = sessionStorage.getItem('startDate')
    this.getList(endDate, startDate );


}

  getList(endDate, startDate) {
    this.dashboardService.getList(endDate, startDate).subscribe(res => {

      if (res && res.severityAggregations) {
        this.investigationData = res.severityAggregations;
      } else {
        this.investigationData = []; // fallback to empty array
      }
    }, error => {
      console.error('Error fetching incident list', error);
      this.investigationData = []; // fallback in error
    });
  }

  sortBy(key: string) {
    this.investigationData = this.sortingService.sortTable(this.investigationData, key);
  }

  isSortedBy(key: string): boolean {
    return this.sortingService.getSortKey() === key;
  }

  isSortOrderAscending(): boolean {
    return this.sortingService.getSortOrder();
  }
  viewDetails(id){

  }
  ngOnDestroy() {
    this.dateRangeSubscription.unsubscribe();
  }
}
