import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Adjudicator_LoginRequest } from '../adjudicator_login_reguest';
import { AdjudicatorAuthService } from '../Services/adjudicator-auth.service';


@Component({
  selector: 'app-adjudicator-login',
  templateUrl: './adjudicator-login.component.html',
  styleUrls: ['./adjudicator-login.component.css']
})
export class AdjudicatorLoginComponent {
  AdjudicatorLogin!: FormGroup;
  errorMessage!: string;
  showAlert!: boolean;
  adjudicator_LoginRequest: Adjudicator_LoginRequest = new Adjudicator_LoginRequest();

  constructor(private formBuilder: FormBuilder,private router: Router,private authService: AdjudicatorAuthService,private route: ActivatedRoute)
  {

  }

  ngOnInit() {
    this.AdjudicatorLogin = this.formBuilder.group({
      username:  ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]

    });
    this.adjudicator_LoginRequest.username = this.AdjudicatorLogin.controls['username'].value;
    this.adjudicator_LoginRequest.password = this.AdjudicatorLogin.controls['password'].value;
 
  }


  onSubmit(): void {
    this.adjudicator_LoginRequest.username = this.AdjudicatorLogin.controls['username'].value;
    this.adjudicator_LoginRequest.password = this.AdjudicatorLogin.controls['password'].value;
    if (this.AdjudicatorLogin.controls['username'].invalid) {
      // Handle invalid email here
      this.AdjudicatorLogin.controls['username'].setErrors({ 'invalid-username': true });
    } else if (this.AdjudicatorLogin.controls['password'].invalid) {
      // Handle invalid password here
      this.AdjudicatorLogin.controls['password'].setErrors({ 'invalid-password - password must be minimum of length 6': true });
    } else {
      // Set the email and password values of the loginRequest object
    
   
  
      this.authService.AuthenticateUser(this.adjudicator_LoginRequest).subscribe(
        token => {
          localStorage.setItem('token', token);
         
  
          this.showAlert=true;
          setTimeout(() => {
            this.router.navigate(['/workQueue']);
          }, 2000);
        },
        (error) => {

         
          // this.errorMessage = '<strong>Login Failed!! </strong><br> Invalid email or password';

          // setTimeout(() => {
          //   this.errorMessage = '';
          // }, 2000); // show the error message for 1.5 seconds



          if (error.status === 400) {
            //this.loginForm.controls['email'].setErrors({ 'invalid-email': true });
            //this.loginForm.controls['password'].setErrors({ 'invalid-password': true });
            this.errorMessage = 'Invalid email or password.';
          } else if (error.status === 500) {
            this.errorMessage = 'Internal Server Error! Try again';
          } if (error.status === 401) {
            this.errorMessage = 'Incorrect  Password!';
          }
          else {
            this.errorMessage = '<strong>Login Failed!! </strong><br> Invalid email and password';
          }
          setTimeout(() => {
            this.errorMessage = '';
          }, 2000);
        }
        
      );
    }
  }
  

}
