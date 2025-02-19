import { Component } from '@angular/core';
import { ContainerComponent } from './container/container.component';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, NavComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angularPractice';
}
