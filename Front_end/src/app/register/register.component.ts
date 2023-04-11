import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormGroupDirective, AbstractControl, ValidatorFn, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CityserviceService } from '../cityservice.service';
import { RegisterServiceService } from '../register-service.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @ViewChild('otherText')
  otherText!: ElementRef;
  errorAlert!: boolean;

  getMedicalHistory(): string {
    const checkboxes = document.querySelectorAll('input[name=disease]:checked');
    const selectedDiseases = Array.from(checkboxes).map((cb: any) => cb.value);
   
    // const selectedDiseases = Array.from(checkboxes).map(cb => cb.value);
    const otherText = this.otherText.nativeElement.value;

    return selectedDiseases.concat(otherText).join(', ');
  }




  registrationForm!: FormGroup;
  governmentIdControl = 'governmentId';
  message!: any; 
  showOther = false;
  show: boolean=false;
  showAlert!: boolean;
  // form!: FormGroup;
  states!: any[];
  cities!: any[];
  maxDate: string;
  minDate: string;
  Aerror!: object;

 
 



  checked(){
   this.showOther=!this.showOther;
  }

  constructor(private formBuilder: FormBuilder,private route:Router,private cityService: CityserviceService,private registerService:RegisterServiceService) {
    const currentYear = new Date().getFullYear();
    this.maxDate = `${currentYear - 0}-12-31`;
    this.minDate = `${currentYear - 100}-01-01`; 
  }
    
  

  ngOnInit() {


    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required,this.restrictYear],
      gender: ['', Validators.required],
      address: ['',Validators.required],
      city: ['',Validators.required],
      email: ['', Validators.required, Validators.email,Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}') ],
      password: ['',Validators.required],
      confirmPassword: ['', Validators.required],
      smoking:['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],

      //  governmentId: ['', Validators.required],
       idNumber: ['', Validators.required, this.governmentIdValidator('governmentId')],
       state: ['', Validators.required],
   
    
     
    });
  
    this.cityService.getAllStates().subscribe(states => {
      this.states = states;
    });

    
    
  }
  
 


  get email() {
    return this.registrationForm.get('email');
  }
  get confirmPasswordControl() {
    return this.registrationForm.get('confirmPassword');
  }
  
  passwordsMatch() {
    const passwordControl = this.registrationForm.get('password');
    const confirmPasswordControl = this.registrationForm.get('confirmPassword');

    return passwordControl?.value === confirmPasswordControl?.value;
  }



  checkFormValidity(): boolean {
    let formIsValid = true;
    Object.keys(this.registrationForm.controls).forEach(field => {
      const control = this.registrationForm.get(field);
      if (!control?.value) {
        control?.setErrors({ required: true });
        formIsValid = false;
      } else {
        control.setErrors(null);
      }
    });
    return formIsValid;
  }
  

  





  onSubmit() {
   
   
      if (this.checkFormValidity()) {
            if (this.passwordsMatch()) {
                      console.log('Passwords match');
                  

                     
                                          const { confirmPassword, ...formData } = this.registrationForm.value;
                                          const registrationData = formData;
                                          const medicalHistoryStr = this.getMedicalHistory();
                                          const dataWithMedicalHistory = { ...registrationData, medicalHistory: medicalHistoryStr };
                                          const output = JSON.stringify(dataWithMedicalHistory);
                                          
                        //formData.append('data', dataWithMedicalHistory);
                        console.log(output);


                      this.registerService.register(output)
                      .subscribe(
                        response => {
                          console.log('Registration successful', response);
                          this.showAlert = true;

                          setTimeout(() => {
                            this.route.navigate(['/login']);
                          }, 2000);
                        },
                        error => {
                          console.error('Registration failed', error);
                            //this.Aerror=error;
                          this.errorAlert = true;
                        }
                      );
  

                    
                       
                     console.log('Registration form submitted:-success ');
                     
                    
       
                    
         // alert("Registration success!");
                    
                      //this.route.navigateByUrl('/login');

                           }
                  else {
                    console.log('Passwords do not match');
                    this.show=false;
                    this.confirmPasswordControl?.setErrors({ passwordMismatch: true });
                  }     
    } else {

            console.log('Registration form is invalid');
            console.log('Registration form submitted: ', this.registrationForm.value);
            alert("Fill all cells!");
           
    }
  }

  
   
    onStateChange() {
      const stateId = this.registrationForm.get('state')?.value;
      
          
      this.cityService.getCitiesByState(stateId).subscribe(cities => {
        this.cities = cities;
      });
    
    }
    
      restrictYear(control: AbstractControl): { [key: string]: any } | null {
      const birthDate = new Date(control.value);
      const currentYear = new Date().getFullYear();
      const restrictedYear = currentYear - 18;
      const restrictedDate = new Date(restrictedYear, birthDate.getMonth(), birthDate.getDate());
      
      return birthDate > restrictedDate ? { 'restrictedYear': true } : null;
    }

     governmentIdValidator(governmentIdControl: string): ValidatorFn {
      return (control: AbstractControl): {[key: string]: any} | null => {
        const governmentId = control.parent?.get(governmentIdControl)?.value;
        
        if (governmentId == 'Aadhar Card' && !/^\d{4}\s\d{4}\s\d{4}$/.test(control.value)) {
          return {'invalidAadhaarCardNumber': true};
        } else if (governmentId == 'Pan Card' && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(control.value)) {
          return {'invalidPanCardNumber': true};
        } else if (governmentId =='Election ID' && !/^[A-Z]{3}\d{7}$/.test(control.value)) {
          return {'invalidElectionIdNumber': true};
        }
    
        return null;
      };
    }
  
 

}
