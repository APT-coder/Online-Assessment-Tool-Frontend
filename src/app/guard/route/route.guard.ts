import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const userDetails = JSON.parse(localStorage.getItem("userDetails") || '{}');
    const expectedRole = route.data['expectedRole'] as number [];
    
    if (userDetails && (expectedRole.includes(userDetails.UserType))) {
      return true;
    }

    // Redirect to user's appropriate dashboard
    if (userDetails.UserType === 0) {
      this.router.navigate(['/app/admin']);
    } else if (userDetails.UserType === 1) {
      this.router.navigate(['/app/trainer']);
    } else {
      this.router.navigate(['/app/trainee']);
    }

    return false;
  }
}
