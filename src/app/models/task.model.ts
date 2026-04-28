/* 
  Modelo de dominio para una Tarea.
  Usamos interfaces (no clases) para mantener objetos planos
  compatibles con JSON.stringify/parse sin pérdida de métodos.
*/
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  categoryId: string | null;
  /* Unix timestamp en ms — permite ordenar y mostrar fecha sin librerías externas */
  createdAt: number;
}
