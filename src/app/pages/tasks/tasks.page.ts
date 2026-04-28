import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

import { TaskService } from '../../services/task.service';
import { CategoryService } from '../../services/category.service';
import { Task } from '../../models/task.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-tasks',
  templateUrl: 'tasks.page.html',
  styleUrls: ['tasks.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksPage implements OnInit {
  public tituloNuevaTarea = '';
  public idCategoriaSeleccionada: string = 'default';
  private _filtroActivo$ = new BehaviorSubject<string>('all');

  public categorias$!: Observable<Category[]>;
  public tareasFiltradas$!: Observable<Task[]>;
  public filtroActual$ = this._filtroActivo$.asObservable();

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private alertController: AlertController,
  ) {}

  ngOnInit(): void {
    this.categorias$ = this.categoryService.observarCategorias();

    this.tareasFiltradas$ = combineLatest([
      this.taskService.observarTareas(),
      this._filtroActivo$,
    ]).pipe(
      map(([tareas, idFiltro]) => {
        const cronologicas = [...tareas].sort((a, b) => b.createdAt - a.createdAt);
        
        switch (idFiltro) {
          case 'all': return cronologicas;
          case 'pending': return cronologicas.filter(t => !t.completed);
          case 'completed': return cronologicas.filter(t => t.completed);
          default: return cronologicas.filter(t => t.categoryId === idFiltro);
        }
      })
    );
  }

  public async alCrearTareaRapida(): Promise<void> {
    const titulo = this.tituloNuevaTarea.trim();
    if (!titulo) return;

    await this.taskService.crearTarea(titulo, this.idCategoriaSeleccionada);
    this.tituloNuevaTarea = '';
  }

  public async alCambiarEstado(tarea: Task): Promise<void> {
    await this.taskService.toggleEstado(tarea.id);
  }

  public async alBorrarTarea(tarea: Task): Promise<void> {
    await this.taskService.eliminarTarea(tarea.id);
  }

  public alCambiarFiltro(evento: any): void {
    const valor = evento.detail?.value;
    if (valor) {
      this.seleccionarFiltro(valor);
    }
  }

  public seleccionarFiltro(valor: string): void {
    this._filtroActivo$.next(valor);
    const esCategoriaEspecífica = !['all', 'pending', 'completed'].includes(valor);
    this.idCategoriaSeleccionada = esCategoriaEspecífica ? valor : 'default';
  }

  public trackTarea(_index: number, tarea: Task): string { return tarea.id; }
  public trackCat(_index: number, cat: Category): string { return cat.id; }

  public obtenerColor(id: string | null, cats: Category[]): string {
    return cats.find(c => c.id === id)?.color ?? '#9e9e9e';
  }

  public obtenerNombre(id: string | null, cats: Category[]): string {
    return cats.find(c => c.id === id)?.name ?? 'Sin lista';
  }

  public async abrirDialogoCrear(): Promise<void> {
    const alerta = await this.alertController.create({
      header: 'Nueva Tarea',
      inputs: [{ name: 'titulo', type: 'text', placeholder: '¿Qué hay que hacer?' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Añadir',
          handler: (datos) => {
            this.taskService.crearTarea(datos.titulo, this.idCategoriaSeleccionada);
          },
        },
      ],
    });
    await alerta.present();
  }
}
