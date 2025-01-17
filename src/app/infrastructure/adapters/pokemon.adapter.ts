import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PokemonApiService } from '../api/pokemon-api.service';
import { IPokemonRepository } from '../../domain/interfaces/pokemon.repository';
import { Pokemon } from '../../domain/models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonAdapter implements IPokemonRepository {
  constructor(private pokemonApi: PokemonApiService) {}

  async getAllPokemons(): Promise<Pokemon[]> {
    try {
      const data = await firstValueFrom(this.pokemonApi.getAllPokemons());
      return data?.results?.map((item) => this.mapToPokemon(item)) || [];
    } catch (error) {
      console.error('[PokemonAdapter] Error al obtener todos los pokemons:', error);
      return [];
    }
  }

  async getPokemonById(id: string): Promise<Pokemon | null> {
    try {
      const data = await firstValueFrom(this.pokemonApi.getPokemonById(id));
      return data ? this.mapToPokemon(data) : null;
    } catch (error) {
      console.error(`[PokemonAdapter] Error al obtener el pokemon con ID ${id}:`, error);
      return null;
    }
  }

  private mapToPokemon(apiData: any): Pokemon {
    return {
      id: apiData.id,
      name: apiData.name,
      nationalPokedexNumbers: apiData.nationalPokedexNumbers,
      type: apiData.type,
      hp: apiData.hp,
      attack: apiData.attack,
      rule: apiData.rule,
      series: apiData.series,
      rarity: apiData.rarity,
      image: apiData.image,
    };
  }
}
