// src/app/shared/popup/pokemon-popup.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../domain/models/pokemon.model';


@Component({
  standalone: true,
  selector: 'app-pokemon-popup',
  imports: [CommonModule],
  template: `
    <div class="overlay" (click)="closePopup()">
      <!-- Evitamos que el click dentro del popup cierre accidentalmente -->
      <div class="popup" (click)="$event.stopPropagation()">
        <button class="close-btn" (click)="closePopup()">×</button>
        <h2>{{ pokemon?.name }}</h2>
        <img [src]="pokemon?.image" [alt]="pokemon?.name" />

        <p>Status: {{ pokemon?.type }}</p>
        <p>aAttack: {{ pokemon?.attack }}</p>
        <p *ngIf="pokemon?.nationalPokedexNumbers">National Pokedex Numbers: {{ pokemon?.nationalPokedexNumbers }}</p>
        <p *ngIf="pokemon?.type">Type: {{ pokemon?.type }}</p>
      </div>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999; /* para asegurar que esté arriba de todo */
    }
    .popup {
      position: relative;
      background: #fff;
      padding: 1.5rem;
      border-radius: 6px;
      max-width: 400px;
      width: 90%;
      text-align: center;
    }
    .close-btn {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: transparent;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }
    img {
      max-width: 100%;
      height: auto;
      margin: 1rem 0;
      border-radius: 4px;
    }
    h2 {
      margin-top: 0;
    }
  `],
})
export class PokemonPopupComponent {
  @Input() pokemon: Pokemon | null = null;
  @Output() close = new EventEmitter<void>();

  /**
   * Notifica al padre que el popup debe cerrarse.
   */
  closePopup(): void {
    this.close.emit();
  }
}
