import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../Services/auth-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardData: any = {};

  constructor(private http: HttpClient,private authService: AuthServiceService) { }
  showAlertBoX: boolean = false;

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData() {
    const url = 'http://localhost:8080/api/adjudicator/Dashboard';
    this.http.get(url).subscribe((data: any) => {
      this.dashboardData = data;
      console.log(this.dashboardData);
    }, error => {
      console.error(error);
    });
  }

  onActionChange(item: any) {
    console.log('New action:', item.action);
    // item.dirty = true; // set dirty flag
    // TODO: Send PUT request to update the item's action in the backend
  }
  
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

  // TO SAVE THE CHANGES IN DATABASE
  
  // saveTable() {
  //   const dirtyItems = this.dashboardData.filter((item: { dirty: any; }) => item.dirty);
  //   if (dirtyItems.length > 0) {
  //     const url = 'http://localhost:8080/api/adjudicator/Dashboard';
  //     this.http.put(url, dirtyItems).subscribe((response: any) => {
  //       console.log('Data saved:', response);
  //       // Reset the dirty flag for each item
  //       dirtyItems.forEach((item: { dirty: boolean; }) => item.dirty = false);
  //       this.showAlertBoX = true;
  //     }, error => {
  //       console.error('Data save error:', error);
  //     });
  //   }
  }



