
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CodesService } from '../Services/codes.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sampledropdown',
  templateUrl: './sampledropdown.component.html',
  styleUrls: ['./sampledropdown.component.css']
})
export class SampledropdownComponent {

  icdCodes:any = [];
  cptCodes:any = [];

  constructor(private http: HttpClient, private codeservice: CodesService) { }

  ngOnInit(): void {
    const icdCodes$ = this.codeservice.get_ICD_Codes('');
    const cptCodes$ = this.codeservice.get_CPT_Codes('');

    forkJoin([icdCodes$, cptCodes$]).subscribe(([icdCodes, cptCodes]) => {
      this.icdCodes = icdCodes;
      this.cptCodes = cptCodes;
    });
  }

  search_ICD_Fn(term: string, item: any) {
    return item.description.toLowerCase().indexOf(term.toLowerCase()) > -1 || item.code.toLowerCase().indexOf(term.toLowerCase()) > -1;
  }

  search_CPT_Fn(term: string, item: any) {
    return item.description.toLowerCase().indexOf(term.toLowerCase()) > -1 || item.code.toLowerCase().indexOf(term.toLowerCase()) > -1;
  }
}


