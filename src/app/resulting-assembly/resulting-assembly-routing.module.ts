import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core';
import { ResultingAssemblyComponent } from './resulting-assembly.component';

const routes: Routes = [
  {
    path: '',
    component: ResultingAssemblyComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultingAssemblyRoutingModule {}
