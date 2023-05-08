import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-claim-history',
  templateUrl: './claim-history.component.html',
  styleUrls: ['./claim-history.component.css']
})
export class ClaimHistoryComponent implements OnInit {
      rows: any[] = [];
      constructor(private http: HttpClient) {}
    
      ngOnInit() {
        this.http.get<any[]>('url').subscribe(
          response => {
            this.rows = response;
          },
          error => {
            console.log('Error fetching claims:', error);
          }
        );
      }
    
    }


