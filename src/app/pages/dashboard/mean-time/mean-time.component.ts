import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppLabelConstants} from "../../../constants/AppLabelConstant";
import {NgxEchartsDirective} from 'ngx-echarts';
import {DashboardService} from '../../../Services/pagesService/dashboard.service';
import {DateRangeServiceService} from '../../../Services/genericComponentService/date-range-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-mean-time',
  standalone: true,
  imports: [
    NgxEchartsDirective
  ],
  templateUrl: './mean-time.component.html',
  styleUrl: './mean-time.component.css'
})
export class MeanTimeComponent implements OnInit , OnDestroy{
  severityDonutOptions: any;
    protected readonly labelContent = AppLabelConstants;
  private dateRangeSubscription: Subscription = new Subscription();
    constructor(private dashboardService: DashboardService,
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
    this.getCounts(endDate, startDate );


  }


  getCounts(endDate, startDate) {
    this.dashboardService.getCounts(endDate, startDate).subscribe(res => {


      const processedData:any = this.processSeverityByDateData(res);
      this.loadChart(processedData);
    });
  }



  loadChart(processedData): void {
    const { dates, lows, mediums, highs, criticals } = processedData;

    this.severityDonutOptions = {
      tooltip: { trigger: 'axis' },
      legend: {
        data: ['Low', 'Medium', 'High', 'Critical'],
        textStyle: { color: '#fff' }
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: { color: '#fff' },
        axisLine: { lineStyle: { color: '#fff' } }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#fff' },
        axisLine: { lineStyle: { color: '#fff' } },
        splitLine: { lineStyle: { color: '#444' } }
      },
      series: [
        {
          name: 'Low',
          type: 'bar',
          data: lows,
          itemStyle: { color: '#baa90a' }
        },
        {
          name: 'Medium',
          type: 'bar',
          data: mediums,
          itemStyle: { color: '#4cabce' }
        },
        {
          name: 'High',
          type: 'bar',
          data: highs,
          itemStyle: { color: '#006699' }
        },
        {
          name: 'Critical',
          type: 'bar',
          data: criticals,
          itemStyle: { color: '#e5323e' }
        }
      ]
    };
  }




  processSeverityByDateData(responseSeverityArray) {
    const dates: string[] = [];
    const lows: number[] = [];
    const mediums: number[] = [];
    const highs: number[] = [];
    const criticals: number[] = [];
    const totals: number[] = [];

    for (let severityItem of responseSeverityArray.topStatsCounts) {
      let low = 0;
      let medium = 0;
      let high = 0;
      let critical = 0;

      for (let item of severityItem.subAggregationResponses) {
        if (item.severity >= 1 && item.severity <= 1.5) {
          low += item.count;
        } else if (item.severity > 1.5 && item.severity <= 2) {
          medium += item.count;
        } else if (item.severity > 2 && item.severity <= 3.5) {
          high += item.count;
        } else if (item.severity > 3.5 && item.severity <= 10) {
          critical += item.count;
        }
      }

      const total = low + medium + high + critical;

      dates.push(severityItem.date);
      lows.push(low);
      mediums.push(medium);
      highs.push(high);
      criticals.push(critical);
      totals.push(total);
    }

    return { dates, lows, mediums, highs, criticals, totals };
  }



  ngOnDestroy() {
    this.dateRangeSubscription.unsubscribe();
  }
}
