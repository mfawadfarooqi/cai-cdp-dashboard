import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppLabelConstants} from "../../../constants/AppLabelConstant";
import { CommonModule } from '@angular/common';
import {ConfigApiService} from '../../../Services/urls/config-api.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {DashboardService} from '../../../Services/pagesService/dashboard.service';
@Component({
  selector: 'app-investagtion-severity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './investagtion-severity.component.html',
  styleUrl: './investagtion-severity.component.css'
})

export class InvestigationSeverityComponent  {
  public labelContent = AppLabelConstants;
constructor() {
}

}

