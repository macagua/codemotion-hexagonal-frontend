// src/app/shared/header/header.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  // No necesitamos imports de otros módulos aquí (salvo que uses *ngIf, etc.)
  template: `
    <header class="app-header">
      <div class="title">EY codemotion Front-End</div>
      <button class="logout-button" (click)="onCharacters()">
        Characters
      </button>
      <button class="pokemons-button" (click)="onPokemons()">
        Pokemons
      </button>
      <button class="logout-button" (click)="onLogout()">
        Logout
      </button>
    </header>
  `,
  styles: [`
    .app-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #2c3e50;
      color: #fff;
      padding: 0.75rem 1rem;
    }
    .title {
      font-weight: bold;
      font-size: 1.1rem;
    }
    .pokemons-button {
      background: #e74c3c;
      color: #fff;
      border: none;
      padding: 0.5rem 0.75rem;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
    }
    .pokemons-button:hover {
      background: #c0392b;
    }
    .logout-button {
      background: #e74c3c;
      color: #fff;
      border: none;
      padding: 0.5rem 0.75rem;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
    }
    .logout-button:hover {
      background: #c0392b;
    }
  `],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  onCharacters(): void {
    // Ejemplo simple: Mostrar la galería de Personajes
    this.router.navigate(['/gallery']);
  }

  onPokemons(): void {
    // Ejemplo simple: Mostrar la galería de Pokemons
    this.router.navigate(['/pokemons']);
  }

  onLogout(): void {
    // Ejemplo simple: Al hacer logout, redireccionamos a /login
    this.router.navigate(['/login']);
  }
}
