import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class roleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data?.['role'];  // 👈 SAFE ACCESS
    const userRole = this.authService.getRole();

    // If no role required → allow
    if (!expectedRole) {
      return true;
    }

    // If role matches → allow
    if (userRole === expectedRole) {
      return true;
    }

    // Otherwise redirect
    this.router.navigate(['/']);
    return false;
  }
}
