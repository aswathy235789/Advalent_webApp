import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-claim-history',
  templateUrl: './claim-history.component.html',
  styleUrls: ['./claim-history.component.css']
})
export class ClaimHistoryComponent implements OnInit {
      rows: any[] = [];
    showAlert:boolean=false;
  message!: string;
  statusMessage!: string;
      constructor(private http: HttpClient) {}
    
      ngOnInit() {
        const id = localStorage.getItem('memberId');
        this.http.get<any[]>(`${environment.baseUrl}/claims/history/${id}`).subscribe(
          response => {
            this.rows = response;
          },
          error => {
            console.log('Error fetching claims:', error);
          }
        );
      }
    showStatus(status: string) {
      this.statusMessage = status;
      this.showAlert = true;
    }
    
    closeAlertBox()
    {
      this.showAlert=false;
    }
    
    }


