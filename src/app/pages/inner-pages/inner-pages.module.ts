import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InnerPagesRoutingModule } from './inner-pages-routing.module';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {NgxEchartsModule} from 'ngx-echarts';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    InnerPagesRoutingModule,
    DashboardComponent,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ]
})
export class InnerPagesModule {

}
