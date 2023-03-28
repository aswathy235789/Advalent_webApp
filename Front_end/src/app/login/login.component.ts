import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  showAlert!: boolean;
  


  constructor(private formBuilder: FormBuilder,private router: Router) { }

  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.controls['email'].invalid) {
      // Handle invalid email here
      // Handle invalid email here
      this.loginForm.controls['email'].setErrors({ 'invalid-email': true });

    } else if (this.loginForm.controls['password'].invalid) {
      // Handle invalid password here
      
      this.loginForm.controls['password'].setErrors({ 'invalid-password - password must be minimum of length 6': true });

    } else {
      
      this.showAlert=true;
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000);
    }
  }



}

