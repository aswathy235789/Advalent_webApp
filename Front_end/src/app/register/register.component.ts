import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registrationForm!: FormGroup;
  message!: string; 
  showOther = false;
  // medicalHistoryOptions = [
  //   { label: 'Diabetes', value: 'diabetes' },
  //   { label: 'Blood Pressure', value: 'blood pressure' },
  //   { label: 'Other', value: 'other' }
  // ];
  checked(){
   this.showOther=!this.showOther;
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      addressLine: [''],
      city: [''],
      phoneNumber: ['', Validators.required],
      governmentId: ['', Validators.required],
      idNumber: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['',Validators.required],
      confirm_password: ['', Validators.required]

      // medicalHistory: new FormControl([], Validators.compose([Validators.required, this.checkMedicalHistory]))
      
    });
  }
  // checkMedicalHistory(control: FormControl) {
  //   const selected = control.value;
  //   if (selected && selected.length > 0) {
  //     return null;
  //   }
  //   return { 'invalidSelection': true };
  // }
  //this.registrationForm.valid && 
  onSubmit() {
    console.log("inside");
    if (Object.values(this.registrationForm.value).every(val => val !== null)) {
      console.log('Registration form submitted: ', this.registrationForm.value);
      this.message = "Successfully Registered!"
      // add code to submit form data
    } else {
      console.log('Registration form is invalid');
      console.log('Registration form submitted: ', this.registrationForm.value);
      this.message = "Registration form is invalid!"
      // add code to show error message to user
    }
  }
  

}


  