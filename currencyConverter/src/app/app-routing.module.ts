import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyComponent } from './currency/currency.component';
import { CurrencyChartComponent } from './currency-chart/currency-chart.component';

const routes: Routes = [
  { path: 'currency', component:CurrencyComponent },
{ path: 'graph', component: CurrencyChartComponent },


{ path: '', redirectTo: '/currency', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
