import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PokemonInterface } from '../../domain/interfaces/pokemon.interface';
import { PokemonApiService } from '../api/pokemons-api.service';
import { Pokemon } from '../../domain/models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonAdapter implements PokemonInterface {
  constructor(private pokemonApi: PokemonApiService) {}

  async getAllPokemons(): Promise<Pokemon[]> {
    try {
      const data = await firstValueFrom(this.pokemonApi.getAllPokemons());
      return data?.map((item) => this.mapToPokemon(item)) || [];
    } catch (error) {
      console.error('[PokemonAdapter] Error al obtener todos los pokemons:', error);
      return [];
    }
  }

  async getPokemonById(id: number): Promise<Pokemon | null> {
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
      nationalPokedexNumbers: apiData.nationalPokedexNumbers,
      type: apiData.type,
      hp: apiData.hp,
      attack: apiData.attack,
      rule: apiData.rule,
      setSeries: apiData.setSeries,
      rarity: apiData.rarity,
      image: apiData.image,
    };
  }
}
