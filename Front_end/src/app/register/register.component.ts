import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  registrationForm!: FormGroup;
  message!: any; 
  showOther = false;
  show: boolean=false;
  // medicalHistoryOptions = [
  //   { label: 'Diabetes', value: 'diabetes' },
  //   { label: 'Blood Pressure', value: 'blood pressure' },
  //   { label: 'Other', value: 'other' }
  // ];
  checked(){
   this.showOther=!this.showOther;
  }

  constructor(private formBuilder: FormBuilder,private route:Router) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      addressLine: ['',Validators.required],
      city: ['',Validators.required],
      email: ['', Validators.required],
      password: ['',Validators.required],
      confirmPassword: ['', Validators.required],
      smoke:['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?\d{10,}$/)]],
       idNumber: ['', Validators.required],
       governmentId: ['', Validators.required]
      // medicalHistory: new FormControl([], Validators.compose([Validators.required, this.checkMedicalHistory]))
      // addressLine: [''],
      // city: [''],
      // phoneNumber: ['', Validators.required],
    
     
    });
  }
  get confirmPasswordControl() {
    return this.registrationForm.get('confirmPassword');
  }
  
  passwordsMatch() {
    const passwordControl = this.registrationForm.get('password');
    const confirmPasswordControl = this.registrationForm.get('confirmPassword');

    return passwordControl?.value === confirmPasswordControl?.value;
  }
  closeAlert() {
    this.message = null; // or this.message = "";
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
    if (!this.registrationForm.invalid&& Object.values(this.registrationForm.value).every(val => val !== null)) {
       if (this.passwordsMatch()) {
        console.log('Passwords match');
        console.log('Registration form submitted:-success ', this.registrationForm.value);
        this.show=true;
        this.message = `Successfully Registered!`;

      
      } else {
        console.log('Passwords do not match');
        this.show=false;
        this.confirmPasswordControl?.setErrors({ passwordMismatch: true });
      }
     
      

      
    } else {
      console.log('Registration form is invalid');
      console.log('Registration form submitted: ', this.registrationForm.value);
      this.message = "Registration form is invalid!"
      // add code to show error message to user
    }
   
  }
  
 
  
}


  
  