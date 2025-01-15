// src/app/infrastructure/adapters/user.adapter.ts

import { Injectable } from '@angular/core';

import { LoginService } from '../api/login.service';
import { firstValueFrom } from 'rxjs';
import { IUserRepository } from '../../domain/interfaces/user.repository';
import { User } from '../../domain/models/user.model';

/**
 * Implementa la interfaz IUserRepository usando un servicio que
 * mockea el proceso de login, sin llamar a un endpoint real.
 */
@Injectable({
  providedIn: 'root',
})
export class UserAdapter implements IUserRepository {
  constructor(private loginService: LoginService) {}

  /**
   * Consume el servicio de login simulado (mock), retornando
   * un User si las credenciales son correctas o null en caso contrario.
   */
  async login(username: string, password: string): Promise<User | null> {
    try {
      const user = await firstValueFrom(
        this.loginService.login(username, password)
      );
      return user; // user o null
    } catch (error) {
      console.error('[UserAdapter] Error en login:', error);
      return null;
    }
  }
}
