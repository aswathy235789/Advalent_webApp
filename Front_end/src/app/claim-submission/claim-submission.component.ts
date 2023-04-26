import { Component, NgModule } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { CodesService } from '../Services/codes.service';

import { ProviderService } from '../Services/provider.service';

import { forkJoin } from 'rxjs';







@Component({

  selector: 'app-claim-submission',

  templateUrl: './claim-submission.component.html',

  styleUrls: ['./claim-submission.component.css']

})




export class ClaimSubmissionComponent {




  icdCodes:any = [];

  cptCodes:any = [];

  providers:any=[];




  constructor(private http: HttpClient, private codeservice: CodesService, private providerService: ProviderService) { }




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


