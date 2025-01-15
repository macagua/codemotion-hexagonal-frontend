import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { RickAndMortyApiService } from '../api/rick-and-morty-api.service';
import { ICharacterRepository } from '../../domain/interfaces/character.repository';
import { Character } from '../../domain/models/character.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterAdapter implements ICharacterRepository {
  constructor(private rickAndMortyApi: RickAndMortyApiService) {}

  async getAllCharacters(): Promise<Character[]> {
    try {
      const data = await firstValueFrom(this.rickAndMortyApi.getAllCharacters());
      return data?.results?.map((item) => this.mapToCharacter(item)) || [];
    } catch (error) {
      console.error('[CharacterAdapter] Error al obtener todos los personajes:', error);
      return [];
    }
  }

  async getCharacterById(id: number): Promise<Character | null> {
    try {
      const data = await firstValueFrom(this.rickAndMortyApi.getCharacterById(id));
      return data ? this.mapToCharacter(data) : null;
    } catch (error) {
      console.error(`[CharacterAdapter] Error al obtener el personaje con ID ${id}:`, error);
      return null;
    }
  }

  private mapToCharacter(apiData: any): Character {
    return {
      id: apiData.id,
      name: apiData.name,
      status: apiData.status,
      species: apiData.species,
      type: apiData.type,
      gender: apiData.gender,
      image: apiData.image,
    };
  }
}
