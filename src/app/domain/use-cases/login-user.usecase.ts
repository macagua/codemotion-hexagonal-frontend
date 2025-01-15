import { IUserRepository } from '../interfaces/user.repository';
import { User } from '../models/user.model';

/**
 * Orquesta la acción de iniciar sesión (login) de un usuario,
 * aplicando validaciones de negocio antes de delegar al repositorio.
 */
export class LoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  /**
   * Ejecuta el flujo de login recibiendo credenciales básicas (username, password).
   * Si las credenciales son válidas, retorna un objeto User; 
   * de lo contrario, retorna null o lanza un error según la política de la aplicación.
   */
  public async execute(username: string, password: string): Promise<User | null> {
    if (!username || !password) {
      // Ejemplo de validación mínima
      throw new Error('Username and password are required');
    }

    return this.userRepository.login(username, password);
  }
}
