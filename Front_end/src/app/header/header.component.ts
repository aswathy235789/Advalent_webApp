import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import 'bootstrap';
// import * as $ from 'jquery';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  constructor(private authService: AuthServiceService){}
  showAlertBoX: boolean = false;
  
  
  logout() {
    this.showAlertBoX = true;
     // Call logout method of AuthService
  }
  closeAlertBox() {
    this.showAlertBoX = false;
    this.authService.logout();
    // redirect to login page
    // this.router.navigate(['/login']);
  }

  
  

  

  
  
}
/* Add this JavaScript to enable the dropdown menu */




