import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';
import { LoginRequest } from '../login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showLogoutMessage = false;
  loginForm!: FormGroup;
  showAlert!: boolean;
  loginRequest: LoginRequest = new LoginRequest();

 
 // const loginRequest = new LoginRequest();


  errorMessage!: string;



  constructor(private formBuilder: FormBuilder,private router: Router,private authService: AuthServiceService,private route: ActivatedRoute) { }

  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
    if(params['logout'] == 'true')
    {
      console.log("logout Successfully!")
    } // Check if the logout query parameter is present
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.loginRequest.email = this.loginForm.controls['email'].value;
    this.loginRequest.password = this.loginForm.controls['password'].value;
  }

  
      
      
 

  onSubmit(): void {
    this.loginRequest.email = this.loginForm.controls['email'].value;
    this.loginRequest.password = this.loginForm.controls['password'].value;
    if (this.loginForm.controls['email'].invalid) {
      // Handle invalid email here
      this.loginForm.controls['email'].setErrors({ 'invalid-email': true });
    } else if (this.loginForm.controls['password'].invalid) {
      // Handle invalid password here
      this.loginForm.controls['password'].setErrors({ 'invalid-password - password must be minimum of length 6': true });
    } else {
      // Set the email and password values of the loginRequest object
    
   
  
      this.authService.authenticateUser(this.loginRequest).subscribe(
        token => {
          localStorage.setItem('token', token);
         
  
          this.showAlert=true;
          setTimeout(() => {
            this.router.navigate(['/home']);
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

