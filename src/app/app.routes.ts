import { Routes } from '@angular/router';
import { LoginComponent } from './presentation/login/login.component';
import { AuthGuard } from './presentation/guards/auth.guard';
import { GalleryComponent } from './presentation/gallery/gallery.component';
import { GalleryPokemonComponent } from './presentation/gallery/galleryPokemon.component';


export const routes: Routes = [
  // Ruta pública de login
  {
    path: 'login',
    component: LoginComponent,
  },
  // Ruta privada de gallery (protegida por el guard)
  {
    path: 'gallery',
    component: GalleryPokemonComponent,
    canActivate: [AuthGuard],
  },
  // Redirección por defecto a login
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  // Cualquier ruta no existente redirige también a login
  {
    path: '**',
    redirectTo: 'login',
  },
];
