import { ICharacterRepository } from '../interfaces/character.repository';
import { Character } from '../models/character.model';

/**
 * Orquesta la acción de obtener un Character por su identificador,
 * aplicando validaciones y lógica de negocio necesarias.
 */
export class GetCharacterByIdUseCase {
  constructor(private characterRepository: ICharacterRepository) {}

  public async execute(id: number): Promise<Character | null> {
    if (id <= 0) {
      throw new Error('Invalid ID');
    }
    return this.characterRepository.getCharacterById(id);
  }
}
