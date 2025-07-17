import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AppLabelConstants} from '../../../constants/AppLabelConstant';
import {Subscription} from 'rxjs';
import {DashboardService} from '../../../Services/pagesService/dashboard.service';
import {DateRangeServiceService} from '../../../Services/genericComponentService/date-range-service.service';
import {NgxEchartsDirective} from 'ngx-echarts';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-top-pie-componenets',
  imports: [
    NgxEchartsDirective,
    NgIf
  ],
  templateUrl: './top-pie-componenets.component.html',
  styleUrl: './top-pie-componenets.component.css'
})
export class TopPIeComponenetsComponent  implements OnInit, OnDestroy {
  @Input() credentialsChartType: string
  severityDonutOptions: any;
  public labelContent = AppLabelConstants;
  private dateRangeSubscription: Subscription = new Subscription();
  showNoData: boolean = false;
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
    if (endDate && startDate) {
      this.getCounts(endDate, startDate);
    } else {
      this.showNoData = true;
    }

  }
  getCounts(endDate, startDate) {
    this.dashboardService.getLookupServices(null, this.credentialsChartType, endDate, startDate).subscribe(res => {
      if (res && res.lookUpLists && res.lookUpLists.length > 0) {
        const processedData = this.processLookupList(res.lookUpLists);
        this.loadPieChart(processedData);
        this.showNoData = false;
      } else {
        this.showNoData = true;
        this.severityDonutOptions = {}; // clear chart
      }
    }, error => {
      console.error(error);
      this.showNoData = true;
      this.severityDonutOptions = {}; // clear chart
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


