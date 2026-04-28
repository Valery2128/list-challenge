import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { map, Observable, combineLatest } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

interface FichaEstadistica {
  categoria: Category;
  total: number;
  hechas: number;
  pct: number;
}

@Component({
  selector: 'app-stats',
  templateUrl: 'stats.page.html',
  styleUrls: ['stats.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsPage implements OnInit {
  public totalTareas$!: Observable<number>;
  public completadas$!: Observable<number>;
  public tasaExito$!: Observable<number>;
  public desgloseCategorias$!: Observable<FichaEstadistica[]>;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    const tareas$ = this.taskService.observarTareas();

    this.totalTareas$ = tareas$.pipe(map(t => t.length));
    this.completadas$ = tareas$.pipe(map(t => t.filter(x => x.completed).length));

    this.tasaExito$ = tareas$.pipe(
      map(lista => {
        if (lista.length === 0) return 0;
        const total = lista.length;
        const hechas = lista.filter(t => t.completed).length;
        return Math.round((hechas / total) * 100);
      })
    );

    this.desgloseCategorias$ = combineLatest([
      tareas$,
      this.categoryService.observarCategorias()
    ]).pipe(
      map(([tareas, cats]) => {
        return cats.map(c => {
          const deEstaCat = tareas.filter(t => t.categoryId === c.id);
          const hechas = deEstaCat.filter(t => t.completed).length;
          return {
            categoria: c,
            total: deEstaCat.length,
            hechas: hechas,
            pct: deEstaCat.length === 0 ? 0 : Math.round((hechas / deEstaCat.length) * 100)
          };
        }).filter(f => f.total > 0);
      })
    );
  }

  public trackFicha(_i: number, ficha: FichaEstadistica): string {
    return ficha.categoria.id;
  }
}
