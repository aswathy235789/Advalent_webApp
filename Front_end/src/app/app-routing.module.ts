import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimSubmissionComponent } from './claim-submission/claim-submission.component';
import { ClaimsComponent } from './claims/claims.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent},
  { path: 'claims', component: ClaimsComponent},
  { path: 'claimSubmission', component: ClaimSubmissionComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
