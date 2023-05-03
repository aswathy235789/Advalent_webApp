import { Component, NgModule } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { CodesService } from '../Services/codes.service';

import { ProviderService } from '../Services/provider.service';

import { forkJoin } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertBoxComponent } from '../alert-box/alert-box.component';







@Component({

  selector: 'app-claim-submission',

  templateUrl: './claim-submission.component.html',

  styleUrls: ['./claim-submission.component.css']

})




export class ClaimSubmissionComponent {
    claimsubmission!: FormGroup;
  




  icdCodes:any = [];

  cptCodes:any = [];

  providers:any=[];




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
    phoneNumber: ['', Validators.required,Validators.pattern(/^\d{10}$/)],
    typeOfClaim: ['', Validators.required],
    dateOfService: ['', Validators.required],
    cpt:  ['', Validators.required],
    icd: ['', Validators.required],
    serviceReceived:new FormControl('', [Validators.required, Validators.maxLength(50)]),
    amountCharged: ['', Validators.required],
    declaration: ['', Validators.required]
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
submitForm() {
    if (this.claimsubmission.valid) {
      

    } else {
      alert("Please fill out all fields");
      this.claimsubmission.markAllAsTouched();
    }
  }
  

 

}




