import { CharacterInterface } from '../interfaces/character.interface';
import { Character } from '../models/character.model';

/**
 * Orquesta la acción de obtener una lista de Characters,
 * aislando al dominio de cualquier tecnología concreta (HTTP, etc.).
 */
export class GetCharactersUseCase {
  constructor(private characterRepository: CharacterInterface) {}

  public async execute(): Promise<Character[]> {
    return this.characterRepository.getAllCharacters();
  }
}
