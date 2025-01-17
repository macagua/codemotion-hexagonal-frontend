/**
 * Define la estructura principal de un Pokemon dentro del dominio,
 * sin detalles técnicos (por ejemplo, sin dependencias de Angular o HTTP).
 */
export interface Pokemon {
  id: string;
  name: string;
  nationalPokedexNumbers: string;
  type: string;
  hp: number;
  attack: string;
  rule: string;
  series: string;
  rarity: string;
  image: string;
}
