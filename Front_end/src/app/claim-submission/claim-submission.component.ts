import { Component, NgModule } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { CodesService } from '../Services/codes.service';

import { ProviderService } from '../Services/provider.service';

import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';







@Component({

  selector: 'app-claim-submission',

  templateUrl: './claim-submission.component.html',

  styleUrls: ['./claim-submission.component.css']

})




export class ClaimSubmissionComponent {




  icdCodes:any = [];

  cptCodes:any = [];

  providers:any=[];
claimsubmission!: FormGroup;




  constructor(private http: HttpClient, private codeservice: CodesService, private providerService: ProviderService,private formBuilder: FormBuilder) { }




  ngOnInit(): void {

    const icdCodes$ = this.codeservice.get_ICD_Codes('');

    const cptCodes$ = this.codeservice.get_CPT_Codes('');




    forkJoin([icdCodes$, cptCodes$]).subscribe(([icdCodes, cptCodes]) => {

      this.icdCodes = icdCodes;

      this.cptCodes = cptCodes;

    });

   

    this.providerService.getAllProviders().subscribe(

      data=>{

        this.providers = data;

      }

    )


this.claimsubmission = this.formBuilder.group({
  providerName: ['', Validators.required],
  providerType: ['', Validators.required],
  address: ['', Validators.required],
  phoneNumber: ['', Validators.required],
  typeOfClaim: ['', Validators.required],
  dateOfService: ['', Validators.required],
  cpt: ['', Validators.required],
  icd: ['', Validators.required],
  serviceReceived: ['', Validators.required],
  amountCharged: ['', Validators.required]

  });
}





  //Search for icd codes

  search_ICD_Fn(term: string, item: any) {

    return item.description.toLowerCase().indexOf(term.toLowerCase()) > -1 || item.code.toLowerCase().indexOf(term.toLowerCase()) > -1;

  }

 

  //Search for cpt codes

  search_CPT_Fn(term: string, item: any) {

    return item.description.toLowerCase().indexOf(term.toLowerCase()) > -1 || item.code.toLowerCase().indexOf(term.toLowerCase()) > -1;

  }

 

}



