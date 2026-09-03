import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

@Component({
selector: 'app-login',
standalone: true,
imports: [CommonModule,FormsModule,RouterLink],
templateUrl: './login.component.html',
styleUrl: './login.component.scss'
})
export class LoginComponent {

email = '';
password = '';

errorMessage = '';

constructor(private authService: AuthService,private router: Router) {}

login(): void {

if (!this.email || !this.password) {
  this.errorMessage = 'Please enter email and password.';
  return;
}

this.authService.login(this.email,this.password).subscribe({next: (response) => {
    this.router.navigate(['/product']);   // Go to products after successful login
  },

  error: (error) => {

    if (error.status === 401) {
     this.errorMessage ='Email or password is incorrect.';
    } 
    else if (error.status === 403) {
    this.errorMessage ='Your account is inactive.';
} 
    else if (error.status === 422) {
    this.errorMessage ='Please check your email and password.';
  } 
  else {
    this.errorMessage ='Unable to connect to the server.';
    }
  }

});


}
}
