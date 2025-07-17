import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppLabelConstants} from '../../../constants/AppLabelConstant';
import {Subscription} from 'rxjs';
import {DashboardService} from '../../../Services/pagesService/dashboard.service';
import {DateRangeServiceService} from '../../../Services/genericComponentService/date-range-service.service';
import {NgIf} from '@angular/common';
import {NgxEchartsDirective} from 'ngx-echarts';

@Component({
  selector: 'app-top-melware-attack',
  imports: [
    NgIf,
    NgxEchartsDirective
  ],
  templateUrl: './top-melware-attack.component.html',
  styleUrl: './top-melware-attack.component.css'
})
export class TopMelwareAttackComponent implements OnInit, OnDestroy {
  severityDonutOptions: any;
  showNoData: boolean = false; // 🔥 added flag

  public labelContent = AppLabelConstants;
  private dateRangeSubscription: Subscription = new Subscription();

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
    this.dashboardService.getLookupServices(null, 'MD5', endDate, startDate).subscribe(res => {

      if (res && res.lookUpLists && res.lookUpLists.length > 0) {
        const processedData = this.processLookupList(res.lookUpLists);
        this.loadPieChart(processedData);
        this.showNoData = false;
      } else {
        this.showNoData = true;
        this.severityDonutOptions = {}; // clear chart when no data
      }
    }, error => {
      console.error(error);
      this.showNoData = true;
      this.severityDonutOptions = {};
    });
  }

  processLookupList(lookUpLists) {
    return lookUpLists.map(item => ({
      name: item.name,
      value: item.count
    }));
  }

  loadPieChart(pieData): void {
    this.severityDonutOptions = {
      tooltip: { trigger: 'item' },
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
          label: { color: '#fff' }
        }
      ]
    };
  }

  ngOnDestroy() {
    this.dateRangeSubscription.unsubscribe();
  }
}

