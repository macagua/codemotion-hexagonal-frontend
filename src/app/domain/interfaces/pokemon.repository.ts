import { Pokemon } from '../models/pokemon.model';

/**
 * Contrato que describe cómo obtener y gestionar
 * datos de Pokemon sin exponer detalles técnicos.
 */
export interface IPokemonRepository {
  getAllPokemons(): Promise<Pokemon[]>;
  getPokemonById(id: string): Promise<Pokemon | null>;
}
