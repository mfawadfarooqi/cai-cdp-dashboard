import { Component } from '@angular/core';
import {AppLabelConstants} from "../../constants/AppLabelConstant";
import {CoverageComponent} from "./coverage/coverage.component";
import {InvestigationSeverityComponent} from "./investagtion-severity/investigation-severity.component";
import {CustomerInterventionComponent} from "./customer-intervention/customer-intervention.component";
import {InvestagtionStateTImeComponent} from "./investagtion-state-time/investagtion-state-time.component";
import {MeanTimeComponent} from "./mean-time/mean-time.component";
import {TimeResponseComponent} from "./time-response/time-response.component";
import {RecentIncidentsComponent} from "./recent-incidents/recent-incidents.component";

import {TopOperationSystemsComponent} from "./top-operation-systems/top-operation-systems.component";
import {TopFiveServicesComponent} from "./top-five-services/top-five-services.component";
import {TopMelwareAttackComponent} from "./top-melware-attack/top-melware-attack.component";
import {TopPIeComponenetsComponent} from "./top-pie-componenets/top-pie-componenets.component";

@Component({
    selector: 'app-dashboard',

    templateUrl: './dashboard.component.html',
    imports: [
        CoverageComponent,
        InvestagtionStateTImeComponent,
        MeanTimeComponent,
        TimeResponseComponent,
        RecentIncidentsComponent,

        TopOperationSystemsComponent,
        TopFiveServicesComponent,
        TopMelwareAttackComponent,
        TopPIeComponenetsComponent
    ],
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public labelContent = AppLabelConstants
}
