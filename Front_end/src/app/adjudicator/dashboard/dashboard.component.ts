import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../Services/authentication/auth-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardData: any = {};
  claimDetails: any = {};


  constructor(private http: HttpClient,private authService: AuthServiceService) { }
  showAlertBoX: boolean = false;

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData() {
    const url = 'http://localhost:8080/api/adjudicator/Dashboard';
    this.http.get(url).subscribe((data: any) => {
      this.dashboardData = data;
      // console.log(this.dashboardData);
    }, error => {
      console.error(error);
    });
  }

 
  private claimsUrl = 'http://localhost:8080/api/adjudicator/view';
  
  fetchClaimDetails(claimId: Number) {
    const url = `${this.claimsUrl}/${claimId}`;
    this.http.get(url).subscribe((data: any) => {
      this.claimDetails = data;
      // console.log(this.claimDetails);
      this.openModal();
    }, error => {
      console.error(error);
    });
  }
 
  openModal() {
    const modal = document.getElementById('staticBackdrop');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display:block');
  }

  closeModal() {
    const modal = document.getElementById('staticBackdrop');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display:none');
  }
  onActionChange(item: any) {
    console.log('New action:', item.action);
    // item.dirty = true; // set dirty flag
    
  }
  
  logout() {
    this.showAlertBoX = true;
     // Call logout method of AuthService
  }
  closeAlertBox() {
    this.showAlertBoX = false;
    this.authService.logout();
    // redirect to login page
    
  }

 
  }

  