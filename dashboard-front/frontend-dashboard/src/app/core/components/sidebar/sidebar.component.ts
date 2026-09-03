import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from '../../../shared/components/logout/logout.component';


@Component({
selector: 'app-sidebar',
standalone: true,
imports: [RouterModule, LogoutComponent],
templateUrl: './sidebar.component.html',
styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {




}

