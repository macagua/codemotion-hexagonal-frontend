import { User } from '../models/user.model';

/**
 * Contrato que describe las operaciones necesarias para manejar datos de User.
 * Sirve para abstraer al dominio de detalles de infraestructura (BBDD, APIs, etc.).
 */
export interface IUserRepository {
  /**
   * Verifica credenciales y retorna el User si la validación es exitosa.
   * Si es necesario, podría devolver también un token, o un tipo complejo.
   */
  login(username: string, password: string): Promise<User | null>;
}
