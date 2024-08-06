import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivate {

  constructor(private router: Router) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const userDetails = JSON.parse(localStorage.getItem("userDetails") || '{}');
    const expectedPermission = route.data['expectedPermission'];

    if (userDetails.UserType !== 1) {
      // Not a trainer, allow access (handled by AuthGuard)
      return true;
    }

    try {
      const userPermissions = userDetails.UserRole.permissions;
      const hasPermission = userPermissions.some((perm: any) => perm.permissionName === expectedPermission);

      if (hasPermission) {
        return true;
      } else {
        // Redirect to a default page or display an unauthorized message
        this.router.navigate(['/access-denied']);
        return false;
      }
    } catch (error) {
      console.error('Error fetching user permissions:', error);
      this.router.navigate(['/access-denied']);
      return false;
    }
  }
}
