import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  showSidebar = true;

  constructor(private router: Router) {

    this.router.events.subscribe(() => {

      const url = this.router.url;

      this.showSidebar =
        !url.startsWith('/login') &&
        !url.startsWith('/register');

    });

  }

}