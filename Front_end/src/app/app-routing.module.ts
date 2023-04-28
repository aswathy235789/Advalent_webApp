import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { ClaimSubmissionComponent } from './claim-submission/claim-submission.component';
import { ClaimHistoryComponent } from './claim-history/claim-history.component';
import { ClaimStatusComponent } from './claim-status/claim-status.component';
import { AdjudicatorLoginComponent } from './adjudicator-login/adjudicator-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent},
  { path: 'claimSubmission', component: ClaimSubmissionComponent},
  { path: 'claimHistory', component: ClaimHistoryComponent},
  { path: 'claimStatus', component: ClaimStatusComponent},
  { path: 'Adjudicator', component: AdjudicatorLoginComponent},
  { path: 'DashBoard', component: DashboardComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
