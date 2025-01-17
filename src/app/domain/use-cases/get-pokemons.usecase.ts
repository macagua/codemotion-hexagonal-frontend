import { IPokemonRepository } from '../interfaces/pokemon.repository';
import { Pokemon } from '../models/pokemon.model';

/**
 * Orquesta la acción de obtener una lista de Pokemons,
 * aislando al dominio de cualquier tecnología concreta (HTTP, etc.).
 */
export class GetPokemonsUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  public async execute(): Promise<Pokemon[]> {
    return this.pokemonRepository.getAllPokemons();
  }
}
