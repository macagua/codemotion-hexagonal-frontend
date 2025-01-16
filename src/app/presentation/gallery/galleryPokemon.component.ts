import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { NftAdapter } from '../../infrastructure/adapters/nft.adapter';
import { ClaimNftUseCase } from '../../domain/use-cases/claim-nft.usecase';
import { NFT_ADAPTER } from '../../domain/interfaces/nft-adapter.inferface';
import { ConvertIpfsUseCase } from '../../domain/use-cases/convert-ipfs.usecase';
import { Pokemon } from '../../domain/models/pokemon.model';
import { PokemonAdapter } from '../../infrastructure/adapters/pokemon.adapter';
import { GetPokemonsUseCase } from '../../domain/use-cases/get-pokemons.usecase';
import { GetPokemonByIdUseCase } from '../../domain/use-cases/get-pokemon-by-id.usecase';
import { PokemonPopupComponent } from '../../shared/popup/pokmeon-popup.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  // Importamos CommonModule para *ngFor, *ngIf
  // y nuestros componentes standalone
  imports: [
    CommonModule, 
    HeaderComponent, 
    PokemonPopupComponent
  ],
  templateUrl: './galleryPokemon.component.html',
  styleUrls: ['./gallery.component.css'],
  providers: [
    { provide: NFT_ADAPTER, useClass: NftAdapter },
    ClaimNftUseCase,
    ConvertIpfsUseCase 
  ],
})
export class GalleryPokemonComponent implements OnInit {
  pokemons: Pokemon[] = [];
  selectedPokemon: Pokemon | null = null;
  showPopup = false;

  constructor(private pokemonAdapter: PokemonAdapter) {}

  async ngOnInit(): Promise<void> {
    const getPokemonsUseCase = new GetPokemonsUseCase(this.pokemonAdapter);
    try {
      this.pokemons = await getPokemonsUseCase.execute();
    } catch (error) {
      console.error('[GalleryComponent] Error fetching pokemons:', error);
    }
  }

  /**
   * Cuando el usuario hace clic en un personaje,
   * abrimos el popup con la info del personaje.
   */
  async onCharacterClick(pokemonId: string): Promise<void> {
    const getPokemonByIdUseCase = new GetPokemonByIdUseCase(this.pokemonAdapter);
    try {
      const character = await getPokemonByIdUseCase.execute(parseInt(pokemonId));
      if (character) {
        this.selectedPokemon = character;
        this.showPopup = true;
      }
    } catch (error) {
      console.error(`[GalleryComponent] Error fetching pokemon ID ${pokemonId}:`, error);
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
