import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category, CATEGORY_COLORS } from '../models/category.model';
import { StorageService } from './storage.service';

const CLAVE_CATEGORIAS = 'listtask_categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly CATEGORIA_RAIZ: Category = {
    id: 'default',
    name: 'General',
    color: CATEGORY_COLORS[0],
  };

  private _categorias$ = new BehaviorSubject<Category[]>([this.CATEGORIA_RAIZ]);

  constructor(private storage: StorageService) {
    this.cargarDesdeDisco();
  }

  public observarCategorias(): Observable<Category[]> {
    return this._categorias$.asObservable();
  }

  public async registrarCategoria(nombre: string, color: string): Promise<void> {
    if (!nombre || nombre.trim().length === 0) return;

    const nueva: Category = {
      id: crypto.randomUUID(),
      name: nombre.trim(),
      color,
    };

    await this.actualizarEstado([...this._categorias$.value, nueva]);
  }

  public async modificar(id: string, nombre: string, color: string): Promise<void> {
    if (id === 'default') return;

    const lista = this._categorias$.value.map(c =>
      c.id === id ? { ...c, name: nombre.trim(), color } : c
    );
    await this.actualizarEstado(lista);
  }

  public async borrar(id: string): Promise<void> {
    if (id === 'default') return;

    const filtradas = this._categorias$.value.filter(c => c.id !== id);
    await this.actualizarEstado(filtradas);
  }

  private async actualizarEstado(categorias: Category[]): Promise<void> {
    this._categorias$.next(categorias);
    await this.storage.guardar(CLAVE_CATEGORIAS, categorias);
  }

  private async cargarDesdeDisco(): Promise<void> {
    const guardadas = await this.storage.obtener<Category[]>(CLAVE_CATEGORIAS, [this.CATEGORIA_RAIZ]);

    /* Aseguramos integridad: la categoría General siempre debe estar presente */
    const tieneRaiz = guardadas.some(c => c.id === 'default');
    const definitivas = tieneRaiz ? guardadas : [this.CATEGORIA_RAIZ, ...guardadas];

    this._categorias$.next(definitivas);
  }
}
