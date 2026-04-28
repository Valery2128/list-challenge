import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tasks',
        loadChildren: () => import('../pages/tasks/tasks.module').then(m => m.TasksPageModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('../pages/categories/categories.module').then(m => m.CategoriesPageModule)
      },
      {
        path: 'stats',
        loadChildren: () => import('../pages/stats/stats.module').then(m => m.StatsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tasks',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tasks',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
