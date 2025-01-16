import { PokemonInterface } from '../interfaces/pokemon.interface';
import { Character } from '../models/character.model';
import { Pokemon } from '../models/pokemon.model';

/**
 * Orquesta la acción de obtener una lista de Pokemons,
 * aislando al dominio de cualquier tecnología concreta (HTTP, etc.).
 */
export class GetPokemonsUseCase {
  constructor(private pokemonRepository: PokemonInterface) {}

  public async execute(): Promise<Pokemon[]> {
    return this.pokemonRepository.getAllPokemons();
  }
}
