import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
selector: 'app-access-denied',
standalone: true,
imports: [
CommonModule,
RouterModule
],
templateUrl: './access-denied.component.html',
styleUrl: './access-denied.component.scss'
})
export class AccessDeniedComponent {

constructor(private router: Router) {}
goToProducts(): void {
this.router.navigate(['/product']);
}
}
