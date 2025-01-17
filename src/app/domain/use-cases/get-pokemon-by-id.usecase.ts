import { IPokemonRepository } from '../interfaces/pokemon.repository';
import { Pokemon } from '../models/pokemon.model';

/**
 * Orquesta la acción de obtener un Pokemon por su identificador,
 * aplicando validaciones y lógica de negocio necesarias.
 */
export class GetPokemonByIdUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  public async execute(id: string): Promise<Pokemon | null> {
    if (typeof id !== 'string') {
      throw new Error('Invalid ID');
    }
    return this.pokemonRepository.getPokemonById(id);
  }
}
