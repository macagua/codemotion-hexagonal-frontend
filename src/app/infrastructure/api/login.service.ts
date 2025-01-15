// src/app/infrastructure/api/login.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../domain/models/user.model';


/**
 * Servicio que simula un proceso de login sin conexión real a un backend.
 * Útil para pruebas, demos, o desarrollo offline.
 */
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // Usuario “ficticio” que usamos para mockear el login.
  private mockUser: User = {
    id: 1,
    username: 'user',
    password: 'pass', 
  };

  /**
   * Simula la llamada para loguear un usuario. 
   * Retorna un User si coinciden credenciales; en caso contrario, null.
   */
  login(username: string, password: string): Observable<User | null> {
    // Comparamos con los datos mock
    if (username === this.mockUser.username && password === this.mockUser.password) {
      return of(this.mockUser);
    }
    
    return of(null);
  }
}
