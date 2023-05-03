import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardData: any = {};

  constructor(private http: HttpClient) { }

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
    // TODO: Send PUT request to update the item's action in the backend
  }

}
