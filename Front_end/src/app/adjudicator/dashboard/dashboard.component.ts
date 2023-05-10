import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../Services/authentication/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardData: any = {};
  claimDetails: any = {};
  claimid: any = {};
  status='';
  AlertBoX:boolean=false;
  errorAlert:boolean=false;


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

 
  private claimsUrl =`${environment.baseUrl}/adjudicator/`;
  
  fetchClaimDetails(claimId: Number) {
    const url = `${this.claimsUrl}view/${claimId}`;
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
    this.status=item.action;
    // return item.action;
    // item.dirty = true; // set dirty flag
  }
    
  saveStatus(claimId: number) {
    const url = `${this.claimsUrl}update-action/${claimId}`;
    const body = this.status; 
    const headers = { 'Content-Type': 'text/plain' }; // set the content type to text/plain
    this.http.put(url, body, { headers }).subscribe(
      (response) => {
        this.AlertBoX=true;
        console.log('Claim status updated successfully:', response);
      },
      (error) => {
        
        this.errorAlert=true;
        console.error('Error updating claim status:', error);
      }
    );
  }

  closeAlert() {
    this.AlertBoX = false;
    this.errorAlert=false;
   
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

  