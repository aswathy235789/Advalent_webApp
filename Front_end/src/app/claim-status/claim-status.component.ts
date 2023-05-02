import { Component } from '@angular/core';
import { ClaimServiceService } from '../Services/claim-service.service';

@Component({
  selector: 'app-claim-status',
  templateUrl: './claim-status.component.html',
  styleUrls: ['./claim-status.component.css']
})
export class ClaimStatusComponent {

  
  // claim_id!: number;
  // claimStatus: Claim;
  // errorMessage!: string;

  // constructor(private claimService: ClaimServiceService) { }

  // getClaimStatus() {
  //   this.claimService.getClaimStatusById(this.claim_id)
  //     .subscribe(
  //       claim => {
  //         this.claimStatus = claim;
  //         this.errorMessage = null;
  //       },
  //       error => {
  //         this.claimStatus = null;
  //         this.errorMessage = `Claim with ID ${this.claim_id} not found.`;
  //         console.error(error);
  //       }
  //     );
  // }  
  

}

