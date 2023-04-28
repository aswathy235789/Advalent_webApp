import { NgModule } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';

import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertBoxComponent } from './alert-box/alert-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClaimSubmissionComponent } from './claim-submission/claim-submission.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SampledropdownComponent } from './sampledropdown/sampledropdown.component';
import { ClaimHistoryComponent } from './claim-history/claim-history.component';
import { ClaimStatusComponent } from './claim-status/claim-status.component';
import { AdjudicatorLoginComponent } from './adjudicator-login/adjudicator-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({

  declarations: [

    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    ClaimSubmissionComponent,
    SampledropdownComponent,
    AlertBoxComponent,
    ClaimHistoryComponent,
    ClaimStatusComponent,
    AdjudicatorLoginComponent,
    DashboardComponent   

  ],

  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgSelectModule   

  ],

  providers: [],

  bootstrap: [AppComponent]

})

export class AppModule { }
































