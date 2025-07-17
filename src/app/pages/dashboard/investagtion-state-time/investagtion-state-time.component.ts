import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppLabelConstants} from "../../../constants/AppLabelConstant";
import {ConfigApiService} from '../../../Services/urls/config-api.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {DashboardService} from '../../../Services/pagesService/dashboard.service';
import {Subscription} from 'rxjs';
import {DateRangeServiceService} from '../../../Services/genericComponentService/date-range-service.service';

@Component({
  selector: 'app-investagtion-state-time',
  standalone: true,
  imports: [],
  templateUrl: './investagtion-state-time.component.html',
  styleUrl: './investagtion-state-time.component.css'
})
export class InvestagtionStateTImeComponent implements OnInit, OnDestroy {
  public labelContent = AppLabelConstants
  attackCount: number = 0;
  sensorCount: number = 0;
  malwareCount: number = 0;
  infAssetsCount: number = 0;
  private dateRangeSubscription: Subscription = new Subscription();

  constructor(
    private dashboardService: DashboardService,
    private dateService: DateRangeServiceService,
    private spinner: NgxSpinnerService,) {
  }

  ngOnInit(): void {

    this.dateRangeSubscription = this.dateService.endSelectedDate.subscribe(endDate => {
      this.getAllCounts(); // Pass your dates here
    });
  }

  getAllCounts(): void {
    const endDate = sessionStorage.getItem('endDate')
    const startDate = sessionStorage.getItem('startDate')
    this.getDashboardCounts(endDate, startDate, 'MALWARE');
    this.getDashboardCounts(endDate, startDate, 'ATTACK');
    this.getDashboardCounts(endDate, startDate, 'SENSOR');
    this.getDashboardCounts(endDate, startDate, 'PRIVATE');
  }

  getDashboardCounts(endDate, startDate, countType: any) {
    this.dashboardService.getDashboardCounts(endDate, startDate, countType).subscribe(res => {


      // Check if response has a count field
      if (res && res.count !== undefined) {
        switch (countType) {
          case 'MALWARE':
            this.malwareCount = res.count;
            break;
          case 'ATTACK':
            this.attackCount = res.count;
            break;
          case 'SENSOR':
            this.sensorCount = res.count;
            break;
          case 'PRIVATE':
            this.infAssetsCount = res.count;
            break;
          default:
            console.warn('Unknown count type:', countType);
        }
      }
    }, error => {
      console.error('Error fetching count for', countType, error);
    });
  }

  ngOnDestroy() {
    this.dateRangeSubscription.unsubscribe();
  }
}
