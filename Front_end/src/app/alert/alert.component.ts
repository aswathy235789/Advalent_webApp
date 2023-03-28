import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() showAlert: boolean = false;
  // @Input() alertHeading: string = 'Custom Alert Heading';

}


