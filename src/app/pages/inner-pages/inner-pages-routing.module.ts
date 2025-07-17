import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {SidenavComponent} from '../../layout/sidenav/sidenav.component';

const routes: Routes = [
  {
    path: '', // ✅ this is required
    component: SidenavComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InnerPagesRoutingModule { }
