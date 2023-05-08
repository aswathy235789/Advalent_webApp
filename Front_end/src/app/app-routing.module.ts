import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './users/user-account/home/home.component';
import { LoginComponent } from './users/user-login/login/login.component';
import { RegisterComponent } from './users/user-registrations/register/register.component'

import { ClaimSubmissionComponent } from './users/user-account/claims/claim-submission/claim-submission.component';
import { ClaimStatusComponent } from './users/user-account/claims/claim-status/claim-status.component';
import { ClaimHistoryComponent } from './users/user-account/claims/claim-history/claim-history.component';
import { DashboardComponent } from './adjudicator/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent},
  { path: 'claimSubmission', component: ClaimSubmissionComponent},
  { path: 'claimHistory', component: ClaimHistoryComponent},
  { path: 'claimStatus', component: ClaimStatusComponent},

  { path: 'DashBoard', component: DashboardComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
