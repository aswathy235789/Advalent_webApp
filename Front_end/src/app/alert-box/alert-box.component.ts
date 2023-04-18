import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css']
})
export class AlertBoxComponent {
  @Input()
  message!: string;
  @Output() closeAlert = new EventEmitter();
  
  close() {
    this.closeAlert.emit();
  }
}