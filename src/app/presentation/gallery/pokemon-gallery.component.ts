import { Component, OnInit } from '@angular/core';

/* Si quieres usar *ngFor o *ngIf, no olvides importar CommonModule */
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { PokemonPopupComponent } from '../../shared/popup/pokemon-popup.component';
import { Pokemon } from '../../domain/models/pokemon.model';
import { PokemonAdapter } from '../../infrastructure/adapters/pokemon.adapter';
import { GetPokemonsUseCase } from '../../domain/use-cases/get-pokemons.usecase';
import { GetPokemonByIdUseCase } from '../../domain/use-cases/get-pokemon-by-id.usecase';

@Component({
  selector: 'app-pokemon-gallery',
  standalone: true,
  // Importamos CommonModule para *ngFor, *ngIf
  // y nuestros componentes standalone
  imports: [
    CommonModule,
    HeaderComponent,
    PokemonPopupComponent,
  ],
  templateUrl: './pokemon-gallery.component.html',
  styleUrls: ['./pokemon-gallery.component.css'],
})
export class PokemonGalleryComponent implements OnInit {
  pokemons: Pokemon[] = [];
  selectedPokemon: Pokemon | null = null;
  showPopup = false;

  constructor(private pokemonAdapter: PokemonAdapter) {}

  async ngOnInit(): Promise<void> {
    const getPokemonsUseCase = new GetPokemonsUseCase(this.pokemonAdapter);
    try {
      this.pokemons = await getPokemonsUseCase.execute();
    } catch (error) {
      console.error('[PokemonGalleryComponent] Error fetching pokemons:', error);
    }
  }

  /**
   * Cuando el usuario hace clic en un Pokemon,
   * abrimos el popup con la info del Pokemon.
   */
  async onPokemonClick(pokemonId: string): Promise<void> {
    const getPokemonByIdUseCase = new GetPokemonByIdUseCase(this.pokemonAdapter);
    try {
      const pokemon = await getPokemonByIdUseCase.execute(pokemonId);
      if (pokemon) {
        this.selectedPokemon = pokemon;
        this.showPopup = true;
      }
    } catch (error) {
      console.error(`[PokemonGalleryComponent] Error fetching pokemon ID ${pokemonId}:`, error);
    }
  }

  /**
   * Se llama cuando el popup emite el evento close
   */
  onClosePopup(): void {
    this.showPopup = false;
    this.selectedPokemon = null;
  }
}
