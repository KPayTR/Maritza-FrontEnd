import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'markets',
    loadChildren: () => import('./markets/markets.module').then( m => m.MarketsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
