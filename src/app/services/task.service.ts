import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { StorageService } from './storage.service';

const CLAVE_TAREAS = 'listtask_data_store';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _tareas$ = new BehaviorSubject<Task[]>([]);

  constructor(private storage: StorageService) {
    this.cargarRepositorio();
  }

  public observarTareas(): Observable<Task[]> {
    return this._tareas$.asObservable();
  }

  public async crearTarea(titulo: string, idCategoria: string = 'default'): Promise<void> {
    if (!titulo || titulo.trim().length === 0) return;

    const nuevaTarea: Task = {
      id: crypto.randomUUID(),
      title: titulo.trim(),
      completed: false,
      categoryId: idCategoria,
      createdAt: Date.now(),
    };

    const listaActualizada = [...this._tareas$.value, nuevaTarea];
    await this.sincronizar(listaActualizada);
  }

  public async toggleEstado(id: string): Promise<void> {
    const actualizadas = this._tareas$.value.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    await this.sincronizar(actualizadas);
  }

  public async eliminarTarea(id: string): Promise<void> {
    const filtradas = this._tareas$.value.filter(t => t.id !== id);
    await this.sincronizar(filtradas);
  }

  public async limpiarReferenciasDeCategoria(idCategoria: string): Promise<void> {
    const saneadas = this._tareas$.value.map(t => 
      t.categoryId === idCategoria ? { ...t, categoryId: null } : t
    );
    await this.sincronizar(saneadas);
  }

  private async sincronizar(tareas: Task[]): Promise<void> {
    this._tareas$.next(tareas);
    await this.storage.guardar(CLAVE_TAREAS, tareas);
  }

  private async cargarRepositorio(): Promise<void> {
    const datos = await this.storage.obtener<Task[]>(CLAVE_TAREAS, []);
    this._tareas$.next(datos);
  }
}
