import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Claims } from '../claims';
import { ClaimServiceService } from '../Services/claim-service.service';

@Component({
  selector: 'app-claim-status',
  templateUrl: './claim-status.component.html',
  styleUrls: ['./claim-status.component.css']
})
export class ClaimStatusComponent  {

  claimId!: string;
  claim!: Claims | null;
  errorMessage!: string;

  constructor(private claimsService: ClaimServiceService) {}

  onSubmit() {
    this.claimsService.getClaimById(this.claimId)
      .subscribe(
        claim => this.claim = claim,
        error => this.errorMessage = error
      );
  }

}
