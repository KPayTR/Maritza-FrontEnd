import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisPage } from './analysis.page';

const routes: Routes = [
  {
    path: '',
    component: AnalysisPage,
  },
  {
    path: 'heat-map',
    loadChildren: () => import('./heat-map/heat-map.module').then( m => m.HeatMapPageModule)
  },
  {
    path: 'calculator',
    loadChildren: () => import('./calculator/calculator.module').then( m => m.CalculatorPageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'articles',
    loadChildren: () => import('./articles/articles.module').then( m => m.ArticlesPageModule)
  },
  {
    path: 'multipliers',
    loadChildren: () => import('./multipliers/multipliers.module').then( m => m.MultipliersPageModule)
  },
  {
    path: 'metal-change',
    loadChildren: () => import('./metal-change/metal-change.module').then( m => m.MetalChangePageModule)
  },
  {
    path: 'survey',
    loadChildren: () => import('./survey/survey.module').then( m => m.SurveyPageModule)
  },
  {
    path: 'economic-calendar',
    loadChildren: () => import('./economic-calendar/economic-calendar.module').then( m => m.EconomicCalendarPageModule)
  },
  {
    path: 'model-portfolio',
    loadChildren: () => import('./model-portfolio/model-portfolio.module').then( m => m.ModelPortfolioPageModule)
  },
  {
    path: 'optimal-portfolio',
    loadChildren: () => import('./optimal-portfolio/optimal-portfolio.module').then( m => m.OptimalPortfolioPageModule)
  },
  {
    path: 'risk-calculation',
    loadChildren: () => import('./risk-calculation/risk-calculation.module').then( m => m.RiskCalculationPageModule)
  },
  {
    path: 'risk-map',
    loadChildren: () => import('./risk-map/risk-map.module').then( m => m.RiskMapPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalysisPageRoutingModule {}
