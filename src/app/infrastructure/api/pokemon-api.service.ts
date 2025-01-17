// src/app/infrastructure/api/rick-and-morty-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Servicio que encapsula las llamadas HTTP a la API de Pokemon,
 * manteniendo centralizados los endpoints y la lógica de peticiones.
 */
@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  private readonly BASE_URL = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  /**
   * Devuelve todos los Pokemon desde /api/pokemons.
   */
  getAllPokemons(): Observable<{ results: any[] }> {
    return this.http.get<{ results: any[] }>(`${this.BASE_URL}/pokemons`);
  }

  /**
   * Devuelve la información de un pokemon en concreto
   * según su ID desde /api/pokemon/:id.
   */
  getPokemonById(id: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/pokemon/${id}`);
  }
}
