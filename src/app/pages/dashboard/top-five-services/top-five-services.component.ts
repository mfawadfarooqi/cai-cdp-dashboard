import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgxEchartsDirective } from 'ngx-echarts';
import { AppLabelConstants } from '../../../constants/AppLabelConstant';
import { Subscription, interval } from 'rxjs';
import { DashboardService } from '../../../Services/pagesService/dashboard.service';
import { DateRangeServiceService } from '../../../Services/genericComponentService/date-range-service.service';

@Component({
  selector: 'app-top-five-services',
  standalone: true,
  imports: [
    NgIf,
    NgxEchartsDirective
  ],
  templateUrl: './top-five-services.component.html',
  styleUrl: './top-five-services.component.css'
})
export class TopFiveServicesComponent implements OnInit, OnDestroy {
  severityBarOptions: any;
  showNoData: boolean = false;

  public labelContent = AppLabelConstants;
  private dateRangeSubscription: Subscription = new Subscription();
  private updateInterval: Subscription = new Subscription();
  private data: number[] = [];
  private labels: string[] = [];

  constructor(
    private dashboardService: DashboardService,
    private dateService: DateRangeServiceService,
  ) { }

  ngOnInit() {
    this.dateRangeSubscription = this.dateService.endSelectedDate.subscribe(() => {
      this.getAllCounts();
    });

    // Initial load
  }

  getAllCounts(): void {
    const endDate = sessionStorage.getItem('endDate');
    const startDate = sessionStorage.getItem('startDate');
    this.getCounts(endDate, startDate);
  }

  getCounts(endDate, startDate) {
    this.dashboardService.getLookupServices(null, 'SERVICE', endDate, startDate).subscribe(res => {

      if (res && res.lookUpLists && res.lookUpLists.length > 0) {
        const { labels, data } = this.processLookupList(res.lookUpLists);
        this.labels = labels;
        this.data = data;
        this.loadBarChart(labels, data);
        this.showNoData = false;

        // Start real-time update
        this.startRealTimeUpdate();
      } else {
        this.showNoData = true;
        this.severityBarOptions = {}; // clear chart when no data
      }
    }, error => {
      console.error(error);
      this.showNoData = true;
      this.severityBarOptions = {};
    });
  }

  processLookupList(lookUpLists) {
    const labels = lookUpLists.map(item => item.name);
    const data = lookUpLists.map(item => item.count);
    return { labels, data };
  }

  loadBarChart(labels, data): void {
    this.severityBarOptions = {
      xAxis: {
        max: 'dataMax'
      },
      yAxis: {
        type: 'category',
        data: labels,
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 5 // display top 5 bars
      },
      series: [
        {
          realtimeSort: true,
          name: 'Service Count',
          type: 'bar',
          data: data,
          label: {
            show: true,
            position: 'right',
            valueAnimation: true
          }
        }
      ],
      legend: {
        show: true
      },
      tooltip: {
        trigger: 'item'
      },
      animationDuration: 0,
      animationDurationUpdate: 3000,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear'
    };
  }

  startRealTimeUpdate() {
    if (this.updateInterval) {
      this.updateInterval.unsubscribe();
    }

    this.updateInterval = interval(3000).subscribe(() => {
      // Update data randomly as demo
      this.data = this.data.map(value => value + Math.round(Math.random() * 200));

      this.severityBarOptions = {
        ...this.severityBarOptions,
        series: [
          {
            type: 'bar',
            data: this.data
          }
        ]
      };
    });
  }

  ngOnDestroy() {
    this.dateRangeSubscription.unsubscribe();
    this.updateInterval.unsubscribe();
  }
}
