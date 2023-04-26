import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormGroupDirective, AbstractControl, ValidatorFn, FormControl, FormArray  } from '@angular/forms';

@Component({
  selector: 'app-claim-submission',
  templateUrl: './claim-submission.component.html',
  styleUrls: ['./claim-submission.component.css']
})
export class ClaimSubmissionComponent {
  claimsubmission!: FormGroup;
  constructor(private formBuilder: FormBuilder)
   {

   }
  

  ngOnInit() {
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
}




