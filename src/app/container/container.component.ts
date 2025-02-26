import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [HeaderComponent, NotificationComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
})
export class ContainerComponent {}
