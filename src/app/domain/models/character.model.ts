/**
 * Define la estructura principal de un Character dentro del dominio,
 * sin detalles técnicos (por ejemplo, sin dependencias de Angular o HTTP).
 */
export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type?: string;
  gender: CharacterGender;
  image: string;
}

/**
 * Enumeración de posibles estados para un Character.
 */
export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';

/**
 * Enumeración de posibles géneros para un Character.
 */
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';
