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
    const expectedRole = route.data['expectedRole'];
    
    if (userDetails && (userDetails.UserType === expectedRole || (userDetails.UserType === 0 && expectedRole !== 2))) {
      // Allow access if user role matches or if user is admin and the route is not trainee-specific
      return true;
    }

    // Redirect to user's appropriate dashboard
    if (userDetails.UserType === 0) {
      this.router.navigate(['/admin']);
    } else if (userDetails.UserType === 1) {
      this.router.navigate(['/trainer']);
    } else {
      this.router.navigate(['/trainee']);
    }

    return false;
  }
}
