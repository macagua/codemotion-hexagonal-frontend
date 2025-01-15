// src/app/infrastructure/api/rick-and-morty-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Servicio que encapsula las llamadas HTTP a la API de Rick & Morty,
 * manteniendo centralizados los endpoints y la lógica de peticiones.
 */
@Injectable({
  providedIn: 'root',
})
export class RickAndMortyApiService {
  private readonly BASE_URL = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  /**
   * Devuelve todos los personajes (Characters) desde /character.
   */
  getAllCharacters(): Observable<{ results: any[] }> {
    return this.http.get<{ results: any[] }>(`${this.BASE_URL}/character`);
  }

  /**
   * Devuelve la información de un personaje en concreto
   * según su ID desde /character/:id.
   */
  getCharacterById(id: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/character/${id}`);
  }
}
