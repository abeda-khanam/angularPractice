import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `<div
    class="notification"
    [ngClass]="{ fadeOut: displayNotification }"
  >
    This website uses cookies to provide better user experience.
    <button class="close-btn" (click)="closeNotification()">X</button>
    <!-- event binding [hidden]="displayNotification"-->
  </div>`,
  styles: [
    `
      .notification {
        background-color: #333;
        color: white;
        padding: 15px 20px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
        font-size: 14px;
        text-align: center;
        z-index: 1000;
      }
      .close-btn {
        background: none;
        border: none;
        color: white;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        margin-left: 15px;
        padding: 5px;
        transition: color 0.3s;
      }

      .close-btn:hover {
        color: #ffcc00;
      }

      .fadeOut {
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s 2s, opacity 2s linear;
      }
    `,
  ],
})
export class NotificationComponent {
  displayNotification: boolean = false;
  closeNotification() {
    this.displayNotification = true;
  }
}
