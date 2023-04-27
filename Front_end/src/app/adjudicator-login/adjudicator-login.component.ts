import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-adjudicator-login',
  templateUrl: './adjudicator-login.component.html',
  styleUrls: ['./adjudicator-login.component.css']
})
export class AdjudicatorLoginComponent {
  AdjudicatorLogin!: FormGroup;
  constructor(private formBuilder: FormBuilder)
  {

  }

  ngOnInit() {
    this.AdjudicatorLogin = this.formBuilder.group({
      username:  ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]

    });
 
  }
}
