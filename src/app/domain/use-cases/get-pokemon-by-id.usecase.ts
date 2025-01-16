import { PokemonInterface } from "../interfaces/pokemon.interface";
import { Pokemon } from "../models/pokemon.model";


/**
 * Orquesta la acción de obtener un Pokemon por su identificador,
 * aplicando validaciones y lógica de negocio necesarias.
 */
export class GetPokemonByIdUseCase {
  constructor(private pokemonRepository: PokemonInterface) {}

  public async execute(id: number): Promise<Pokemon | null> {
    if (id <= 0) {
      throw new Error('Invalid ID');
    }
    return this.pokemonRepository.getPokemonById(id);
  }
}
