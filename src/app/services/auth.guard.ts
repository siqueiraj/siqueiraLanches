import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const usuario = this.authService.getUsuario();
    const roles = route.data['roles'] as string[] | undefined;

    if (!usuario) {
      this.router.navigate(['/login']);
      return false;
    }

    if (roles && !roles.includes(usuario.tipo)) {
      this.router.navigate(['/cardapio']);
      return false;
    }

    return true;
  }
}
