import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppLabelConstants} from '../../../constants/AppLabelConstant';
import {Subscription} from 'rxjs';
import {DashboardService} from '../../../Services/pagesService/dashboard.service';
import {DateRangeServiceService} from '../../../Services/genericComponentService/date-range-service.service';
import {NgxEchartsDirective} from 'ngx-echarts';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-time-response',
  standalone: true,
  imports: [
    NgxEchartsDirective,
    NgIf
  ],
  templateUrl: './time-response.component.html',
  styleUrl: './time-response.component.css'
})
export class TimeResponseComponent implements OnInit, OnDestroy {
  severityDonutOptions: any;
  showNoData: boolean = false;
  public labelContent = AppLabelConstants;
  private dateRangeSubscription: Subscription = new Subscription();

  constructor(private dashboardService: DashboardService,
              private dateService: DateRangeServiceService,
  ) {
  }

  ngOnInit() {
    this.dateRangeSubscription = this.dateService.endSelectedDate.subscribe(endDate => {
      this.getAllCounts(); // Pass your dates here
    });
  }

  getAllCounts(): void {
    const endDate = sessionStorage.getItem('endDate')
    const startDate = sessionStorage.getItem('startDate')
    this.getCounts(endDate, startDate);

  }
  getCounts(endDate, startDate) {
    this.dashboardService.getLookupServices(null, 'CATEGORY', endDate, startDate).subscribe(res => {

      const processedData = this.processLookupList(res.lookUpLists);
      this.loadPieChart(processedData);
    });
  }
  processLookupList(lookUpLists) {
    const pieData = lookUpLists.map(item => ({
      name: item.name,
      value: item.count
    }));
    return pieData;
  }
  loadPieChart(pieData): void {
    this.severityDonutOptions = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: { color: '#fff' }
      },
      series: [
        {
          name: 'Category Count',
          type: 'pie',
          radius: '50%',
          data: pieData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            color: '#fff'
          }
        }
      ]
    };
  }

  ngOnDestroy() {
    this.dateRangeSubscription.unsubscribe();
  }
}
