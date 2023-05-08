import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Claims } from 'src/app/claims';
import { ClaimServiceService } from 'src/app/Services/general/claim-service.service';


@Component({
  selector: 'app-claim-status',
  templateUrl: './claim-status.component.html',
  styleUrls: ['./claim-status.component.css']
})
export class ClaimStatusComponent  {

  claimId!: string;
  claim!: Claims | null;
  errorMessage!: string;
  
  claimForm!: FormGroup;

  ngOnInit() {
    this.claimForm = new FormGroup({
      claimId: new FormControl('')
    });
  }

  getClaimNumber() {
    const claimNumber = this.claimForm.get('claimId')?.value;
    console.log(claimNumber); 
    return claimNumber;
    // Or do something else with the value
  }
  constructor(private claimsService: ClaimServiceService) {}

  onSubmit() {
    this.claimsService.getClaimById(this.getClaimNumber())
      .subscribe(
        claim => this.claim = claim,
        error => this.errorMessage = error
      );
  }

}
