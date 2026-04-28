import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

import { CategoryService } from '../../services/category.service';
import { TaskService } from '../../services/task.service';
import { Category, CATEGORY_COLORS } from '../../models/category.model';

interface VistaCategoria extends Category {
  conteo: number;
}

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['categories.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesPage implements OnInit {
  public categorias$!: Observable<VistaCategoria[]>;
  public readonly paleta = CATEGORY_COLORS;

  constructor(
    private categoryService: CategoryService,
    private taskService: TaskService,
    private alertController: AlertController,
  ) {}

  ngOnInit(): void {
    this.categorias$ = combineLatest([
      this.categoryService.observarCategorias(),
      this.taskService.observarTareas()
    ]).pipe(
      map(([cats, tareas]) => cats.map(c => ({
        ...c,
        conteo: tareas.filter(t => t.categoryId === c.id).length
      })))
    );
  }

  public trackCat(_index: number, item: Category): string { return item.id; }

  public async alAgregar(): Promise<void> {
    const alerta = await this.alertController.create({
      header: 'Nueva categoría',
      inputs: [{ name: 'nombre', type: 'text', placeholder: 'Nombre de la lista' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Crear',
          handler: (datos) => {
            const color = this.paleta[Math.floor(Math.random() * this.paleta.length)];
            this.categoryService.registrarCategoria(datos.nombre, color);
          },
        },
      ],
    });
    await alerta.present();
  }

  public async alBorrar(categoria: VistaCategoria): Promise<void> {
    if (categoria.id === 'default') return;

    const tieneTareas = categoria.conteo > 0;
    const alert = await this.alertController.create({
      header: 'Borrar lista',
      message: tieneTareas 
        ? `Tienes ${categoria.conteo} tareas aquí. Se quedarán sin categoría si borras la lista. ¿Seguro?`
        : '¿Quieres eliminar esta lista?',
      buttons: [
        { text: 'No', role: 'cancel' },
        {
          text: 'Sí, borrar',
          role: 'destructive',
          handler: async () => {
            await this.taskService.limpiarReferenciasDeCategoria(categoria.id);
            await this.categoryService.borrar(categoria.id);
          }
        }
      ]
    });
    await alert.present();
  }

  public async alEditar(categoria: Category): Promise<void> {
    if (categoria.id === 'default') return;

    const alert = await this.alertController.create({
      header: 'Renombrar',
      inputs: [{ name: 'nombre', type: 'text', value: categoria.name }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (d) => this.categoryService.modificar(categoria.id, d.nombre, categoria.color)
        }
      ]
    });
    await alert.present();
  }
}
