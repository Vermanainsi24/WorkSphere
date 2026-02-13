import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  // Form Fields
  email: string = '';
  password: string = '';
  hidePassword: boolean = true;

  // UI Role Toggle (visual only)
  role: string = 'EMPLOYEE';

  // Error message
  errorMessage: string = '';

  // Loading state
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    // Basic Validation
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and Password are required';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const loginData = {
      email: this.email,
      password: this.password
    };

    this.authService.login(loginData).subscribe({
      next: (response) => {
         const backendRole = response.role.toUpperCase();
      const selectedRole = this.role.toUpperCase();

      if (backendRole !== selectedRole) {
        this.errorMessage = `You are registered as ${backendRole}, not ${selectedRole}`;
        return;
      }

  localStorage.setItem('token', response.token);
  localStorage.setItem('role', response.role);
  localStorage.setItem('userId', response.userId.toString());

  const userRole = response.role.toUpperCase();

  if (userRole === 'ADMIN') {
    this.router.navigate(['/admin/dashboard']);
  } 
  else if (userRole === 'EMPLOYEE') {
    this.router.navigate(['/employee/dashboard']);
  }
}


      

    });
  }
// login() {

//   if (!this.email || !this.password) {
//     this.errorMessage = 'Email and Password are required';
//     return;
//   }

//   this.isLoading = true;
//   this.errorMessage = '';

//   const loginData = {
//     email: this.email,
//     password: this.password
//   };

//   this.authService.login(loginData).subscribe({

//     next: (response) => {

//       const backendRole = response.role.toUpperCase();
//       const selectedRole = this.role.toUpperCase();

//       if (backendRole !== selectedRole) {
//         // this.errorMessage = `You are registered as ${backendRole}, not ${selectedRole}`;
//         this.errorMessage=`YOU ARE NOT AUTHORIZED TO ACCESS ${selectedRole}`;
//         this.isLoading = false;
//         return;
//       }

//       localStorage.setItem('token', response.token);
//       localStorage.setItem('role', backendRole);
//       localStorage.setItem('userId', response.userId.toString());

//       if (backendRole === 'ADMIN') {
//         this.router.navigate(['/admin/dashboard']);
//       } else {
//         this.router.navigate(['/employee/dashboard']);
//       }

//       this.isLoading = false;
//     },
     
    
//     // error: () => {
//     //   this.errorMessage = 'Invalid email or password';
//     //   this.isLoading = false;
//     // }
//     error: (err) => {

//    if (err.status === 401) {
//         this.errorMessage = 'Invalid email or password';
//       }
//   if (err.status === 404) {
//     this.errorMessage = 'User does not exist. Please register.';
//   }
//   else if (err.status === 401) {
//     this.errorMessage = 'Invalid password.';
//   }
//   else {
//     this.errorMessage = 'Something went wrong. Try again.';
//   }

//   this.isLoading = false;
// }
//   });
// }
// selectRole(selectedRole: string) {
//   this.role = selectedRole;
//   this.errorMessage = '';   // 🔥 clear error
// }


}
