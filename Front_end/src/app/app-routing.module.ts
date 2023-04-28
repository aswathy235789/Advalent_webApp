import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'
import { ClaimSubmissionComponent } from './claim-submission/claim-submission.component';
import { ClaimHistoryComponent } from './claim-history/claim-history.component';
import { ClaimStatusComponent } from './claim-status/claim-status.component';
import { AdjudicatorLoginComponent } from './adjudicator-login/adjudicator-login.component';
<<<<<<< HEAD
import { DashboardComponent } from './dashboard/dashboard.component';
=======
import { WorkQueueComponent } from './work-queue/work-queue.component';
>>>>>>> 5aa97fa5ec5620511e1d637066e49cbec724ad74

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent},
  { path: 'claimSubmission', component: ClaimSubmissionComponent},
  { path: 'claimHistory', component: ClaimHistoryComponent},
  { path: 'claimStatus', component: ClaimStatusComponent},
  { path: 'Adjudicator', component: AdjudicatorLoginComponent},
<<<<<<< HEAD
  { path: 'DashBoard', component: DashboardComponent}
=======
  { path: 'workQueue', component: WorkQueueComponent}
>>>>>>> 5aa97fa5ec5620511e1d637066e49cbec724ad74
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
