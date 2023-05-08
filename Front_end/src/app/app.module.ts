import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './users/user-login/login/login.component';
import { RegisterComponent } from './users/user-registrations/register/register.component';
import { HeaderComponent } from './users/user-account/header/header.component';

import { HomeComponent } from './users/user-account/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertBoxComponent } from './users/user-account/alert-box/alert-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClaimHistoryComponent } from './users/user-account/claims/claim-history/claim-history.component';
import { ClaimSubmissionComponent } from './users/user-account/claims/claim-submission/claim-submission.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ClaimStatusComponent } from './users/user-account/claims/claim-status/claim-status.component';

import { DashboardComponent } from './adjudicator/dashboard/dashboard.component';



@NgModule({

  declarations: [

    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    ClaimSubmissionComponent,

    AlertBoxComponent,
    ClaimHistoryComponent,
    ClaimStatusComponent,

    DashboardComponent

  ],

  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgSelectModule,
    FormsModule
  

  ],

  providers: [],

  bootstrap: [AppComponent]

})

export class AppModule { }






























