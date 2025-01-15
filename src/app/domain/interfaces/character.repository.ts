import { Character } from '../models/character.model';

/**
 * Contrato que describe cómo obtener y gestionar 
 * datos de Character sin exponer detalles técnicos.
 */
export interface ICharacterRepository {
  getAllCharacters(): Promise<Character[]>;
  getCharacterById(id: number): Promise<Character | null>;
}
