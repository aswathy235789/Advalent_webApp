import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormGroupDirective, AbstractControl, ValidatorFn, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs';
import { CityserviceService } from '../../../Services/drop-downs/cityservice.service';
import { DiseaseService } from '../../../Services/drop-downs/disease.service';
import { MedicalHistoryService } from '../../../Services/drop-downs/medical-history.service';
import { RegisterServiceService } from '../../../Services/general/register-service.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  [x: string]: any;
  memberDiseases!: string[];

  @ViewChild('otherText')
  otherText!: ElementRef;
  errorAlert!: boolean;
  

  getMedicalHistory(): string[] {
    const checkboxes = document.querySelectorAll('input[name=disease]:checked');
    const selectedDiseases = Array.from(checkboxes).map((cb: any) => cb.value);

    
    // const selectedDiseases = Array.from(checkboxes).map(cb => cb.value);
    const otherText = this.otherText.nativeElement.value;
   

  //   this.memberDiseases=Array.from(checkboxes).map((cb: any) => cb.value);
  //  this.memberDiseases.push(otherText);

                            selectedDiseases.push(otherText);
                                                    // console.log(selectedDiseases);
                            return selectedDiseases;
  

    //return selectedDiseases.concat(otherText).join(', ');
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
  diseases!: any[];
  errorMessage!: string;


 
 



  checked(){
   this.showOther=!this.showOther;
  }

  constructor(private formBuilder: FormBuilder,
    private route:Router,
    private cityService: CityserviceService,
    private registerService:RegisterServiceService,
    private diseaseService: DiseaseService,
    private medicalHistoryService: MedicalHistoryService) {
    // const currentYear = new Date().getFullYear();
    // this.maxDate = `${currentYear - 0}-12-31`;
    // this.minDate = `${currentYear - 100}-01-01`; 
   

    const earliestDate = new Date('1900-01-01'); // Set the earliest date you want to allow
    const year = earliestDate.getFullYear();
    const month = ('0' + (earliestDate.getMonth() + 1)).slice(-2);
    const day = ('0' + earliestDate.getDate()).slice(-2);
    this.minDate = `${year}-${month}-${day}`;

    const today = new Date(); // Set today's date
    const todayYear = today.getFullYear();
    const todayMonth = ('0' + (today.getMonth() + 1)).slice(-2);
    const todayDay = ('0' + today.getDate()).slice(-2);
    this.maxDate = `${todayYear}-${todayMonth}-${todayDay}`;

  }
    
  

  ngOnInit() {


    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', 
        Validators.required
      
      ],
      gender: ['', Validators.required],
      address: ['',Validators.required],
      city: ['',Validators.required],
      email:['', [
        Validators.required,
        // Validators.email,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ]],
      password: ['',[Validators.required, this.passwordLengthValidator]],
      confirmPassword: ['', Validators.required],
      smoking:['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],

      //  governmentId: ['', Validators.required],
       idNumber: ['', [Validators.required, Validators.pattern( /^(\d{4}\s?){2}\d{4}$/)]],
       state: ['', Validators.required],
   
    
     
    });
  
    this.cityService.getAllStates().subscribe(states => {
      this.states = states;
    });

    this.diseaseService.getAllDiseases().subscribe(diseases => {
      this.diseases = diseases;
    });
    
    
    
  }
  
  // validateDate(control: FormControl) {
  //   const selectedDate = new Date(control.value);
  //   const currentDate = new Date();
  //   if (selectedDate > currentDate) {
  //     return { futureDate: true };
  //   }
  //   return null;
  // }





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
                                    
                   this.registerService.register(formData)
  .pipe(
    flatMap((response: any) => {
      const memberId = response.id;
     

      console.log('Registration successful', response);
      this.showAlert = true;
      setTimeout(() => {
        this.route.navigate(['/login']);
      }, 2000);

     
      return this.medicalHistoryService.addDiseasesToMember(memberId, this.getMedicalHistory());
    })
  )
  .subscribe(
    response => {
      console.log('Diseases added to member', response);
      // Handle success here
    },
    error => {
      if (error.status === 500) {
        this.errorMessage = `<Strong>Registration Failed ! </strong><br>Email is already registered. Please use a different email`;
      }
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
    }
  );
console.log('Registration form submitted:-success ');

                    // end
                   
                    
       
                    
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
            // const dialogRef = this.dialog.open(DialogComponent, {
            //   data: {
            //     //title: 'Fill all cells!',
            //     message: 'Please fill all cells before submitting the form.'
            //   }
            // });
           
    }
  }

  
   
    onStateChange() {
      const stateId = this.registrationForm.get('state')?.value;
      
          
      this.cityService.getCitiesByState(stateId).subscribe(cities => {
        this.cities = cities;
      });
    
    }
    
    //   restrictYear(control: AbstractControl): { [key: string]: any } | null {
    //   const birthDate = new Date(control.value);
    //   const currentYear = new Date().getFullYear();
    //   const restrictedYear = currentYear - 18;
    //   const restrictedDate = new Date(restrictedYear, birthDate.getMonth(), birthDate.getDate());
      
    //   return birthDate > restrictedDate ? { 'restrictedYear': true } : null;
    // }

    passwordLengthValidator(control: { value: any; }) {
      const password = control.value;
      if (password && password.length < 6) {
        return { invalidPassword: true };
      }
      return null;
    }
    
    

}







