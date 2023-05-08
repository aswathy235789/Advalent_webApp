import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css']
})
export class AlertBoxComponent {
  
  showAlert(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }
  @Input()
  message!: string;
  @Output() closeAlert = new EventEmitter();
  
  close() {
    this.closeAlert.emit();
  }
 
}
