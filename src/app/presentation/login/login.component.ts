import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUserUseCase } from '../../domain/use-cases/login-user.usecase';
import { UserAdapter } from '../../infrastructure/adapters/user.adapter';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  private loginUseCase: LoginUserUseCase;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userAdapter: UserAdapter
  ) {
    /**
     * Creamos aquí el caso de uso inyectando el adapter.
     * Así, ya tendremos la instancia lista para usar en onSubmit.
     */
    this.loginUseCase = new LoginUserUseCase(this.userAdapter);
  }

  ngOnInit(): void {
    // Inicializamos el formulario con validadores básicos
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * Se ejecuta al hacer submit del formulario. Realiza la validación básica
   * y llama al caso de uso para ejecutar el login.
   */
  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      try {
        const user = await this.loginUseCase.execute(username, password);
        if (user) {
          // Si el login es correcto, redirigimos a /gallery
          this.router.navigate(['/gallery']);
        } else {
          alert('Credenciales inválidas. Inténtalo de nuevo.');
        }
      } catch (error) {
        console.error('[LoginComponent] Error en login:', error);
        alert('Ha ocurrido un error al iniciar sesión.');
      }
    } else {
      alert('Por favor, completa los campos requeridos.');
    }
  }
}
