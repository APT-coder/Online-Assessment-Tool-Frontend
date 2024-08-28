import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const msalKey = localStorage.getItem("msalKey");
    
    if (msalKey != null || undefined) {
      console.log(msalKey);
      return true;
    }
    else{
      this.router.navigate(['/']);
    }
    return false;
  }
}