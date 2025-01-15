import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  // En una app real, inyectarías aquí un servicio
  // que maneje el estado de autenticación (por ejemplo, SessionService).
  // Para la demo, simulemos que "siempre está deslogueado".

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Ejemplo muy simple:
    // Si no está "logueado", enviamos al usuario a /login y retornamos false.

    const isLoggedIn = true; // Simulación para la demo

    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
