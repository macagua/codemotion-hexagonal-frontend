import { Pokemon } from '../models/pokemon.model';

export interface PokemonInterface {
  /**
   * Obtiene todos los Pokémon.
   * @returns Promise con la lista de Pokémon.
   */
  getAllPokemons(): Promise<Pokemon[]>;

  /**
   * Obtiene un Pokémon por su ID.
   * @param id ID del Pokémon.
   * @returns Promise con los detalles del Pokémon.
   */
  getPokemonById(id: number): Promise<Pokemon | null>;
}
