/* 
  Modelo de dominio para una Categoría.
  El campo color permite asociar un indicador visual a cada categoría
  sin depender de un sistema de temas externo.
*/
export interface Category {
  id: string;
  name: string;
  /* Color en formato HEX (#RRGGBB) para el badge visual */
  color: string;
}

/* Paleta de colores predefinida para que el usuario elija al crear una categoría */
export const CATEGORY_COLORS: string[] = [
  '#6C63FF', // Violeta (default)
  '#FF6584', // Rosa
  '#43D9AD', // Verde menta
  '#F5A623', // Naranja
  '#4A90E2', // Azul
  '#7ED321', // Verde lima
  '#BD10E0', // Magenta
  '#FF5733', // Rojo coral
];
