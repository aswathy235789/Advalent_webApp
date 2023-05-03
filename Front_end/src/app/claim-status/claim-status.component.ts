import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClaimServiceService } from '../Services/claim-service.service';

@Component({
  selector: 'app-claim-status',
  templateUrl: './claim-status.component.html',
  styleUrls: ['./claim-status.component.css']
})
export class ClaimStatusComponent implements OnInit {

  claimForm!: FormGroup;
  claim: any;
  message!: string;

  constructor(private fb: FormBuilder, private claimsService: ClaimServiceService) { }

  ngOnInit(): void {
    this.claimForm = this.fb.group({
      claimId: ['', Validators.required]
    });
  }

  // getClaimStatus() {
  //   const id = this.claimForm.controls.claimId.value;
  //   this.claimsService.getClaimById(id).subscribe(data => {
  //     this.claim = data;
  //     this.message = '';
  //   }, error => {
  //     this.claim = null;
  //     this.message = error.error;
  //   });
  // }

}
