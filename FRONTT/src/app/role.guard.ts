import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot } from '@angular/router';
import { AuthServiceService } from './1services/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const expectedRoles = route.data['expectedRole']; // može biti string ili niz stringova
    const userRole = this.authService.getUserRole();

    if (!this.authService.isLoggedIn()) {
      return this.router.parseUrl('/login');
    }

    // Ako je expectedRoles string, pretvori u niz radi lakše provere
    const rolesArray = Array.isArray(expectedRoles) ? expectedRoles : [expectedRoles];

    // Proveri da li userRole postoji u dozvoljenim ulogama
    if (rolesArray.includes(userRole)) {
      return true;
    } else {
      return this.router.parseUrl('/login'); // ili neku stranicu za "nemate pristup"
    }
  }
}
