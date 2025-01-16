import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { CharacterPopupComponent } from '../../shared/popup/character-popup.component';
import { Character } from '../../domain/models/character.model';
import { CharacterAdapter } from '../../infrastructure/adapters/character.adapter';
import { GetCharactersUseCase } from '../../domain/use-cases/get-characters.usecase';
import { NftAdapter } from '../../infrastructure/adapters/nft.adapter';
import { ClaimNftUseCase } from '../../domain/use-cases/claim-nft.usecase';
import { NFT_ADAPTER } from '../../domain/interfaces/nft-adapter.inferface';
import { ConvertIpfsUseCase } from '../../domain/use-cases/convert-ipfs.usecase';
import { GetCharacterByIdUseCase } from '../../domain/use-cases/get-character-by-id.usecase copy';

@Component({
  selector: 'app-gallery',
  standalone: true,
  // Importamos CommonModule para *ngFor, *ngIf
  // y nuestros componentes standalone
  imports: [
    CommonModule, 
    HeaderComponent, 
    CharacterPopupComponent
  ],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  providers: [
    { provide: NFT_ADAPTER, useClass: NftAdapter },
    ClaimNftUseCase,
    ConvertIpfsUseCase 
  ],
})
export class GalleryComponent implements OnInit {
  characters: Character[] = [];
  selectedCharacter: Character | null = null;
  showPopup = false;

  constructor(private characterAdapter: CharacterAdapter) {}

  async ngOnInit(): Promise<void> {
    const getCharactersUseCase = new GetCharactersUseCase(this.characterAdapter);
    try {
      this.characters = await getCharactersUseCase.execute();
    } catch (error) {
      console.error('[GalleryComponent] Error fetching characters:', error);
    }
  }

  /**
   * Cuando el usuario hace clic en un personaje,
   * abrimos el popup con la info del personaje.
   */
  async onCharacterClick(characterId: number): Promise<void> {
    const getCharacterByIdUseCase = new GetCharacterByIdUseCase(this.characterAdapter);
    try {
      const character = await getCharacterByIdUseCase.execute(characterId);
      if (character) {
        this.selectedCharacter = character;
        this.showPopup = true;
      }
    } catch (error) {
      console.error(`[GalleryComponent] Error fetching character ID ${characterId}:`, error);
    }
  }

  /**
   * Se llama cuando el popup emite el evento close
   */
  onClosePopup(): void {
    this.showPopup = false;
    this.selectedCharacter = null;
  }
}
