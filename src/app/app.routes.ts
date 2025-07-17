import { Routes } from '@angular/router';
import {LoginComponent} from './pages/auth/login/login.component';
import {ForgotPasswordComponent} from './pages/auth/forgot-password/forgot-password.component';
import {PasswordRecoveryComponent} from './pages/auth/password-recovery/password-recovery.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'password-recovery', component: PasswordRecoveryComponent },
  {
    path: 'modules',
    loadChildren: () => import('./pages/inner-pages/inner-pages.module').then(m => m.InnerPagesModule),
    // canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
